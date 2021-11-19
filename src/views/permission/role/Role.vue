<!--
  * 角色切换和菜单配置（后端控制权限使用）
-->
<template>
  <div class="app-container">
    <!-- 新增角色 -->
    <el-button type="primary" @click="handleCreateRole">
      {{ t('permission.createRole') }}
    </el-button>
    <!-- 角色列表 -->
    <el-table :data="rolesList" style="width: 100%; margin-top: 30px" border>
      <el-table-column align="center" label="角色Id" width="220">
        <template #default="{ row }">
          {{ row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template #default="{ row }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色名称描述">
        <template #default="{ row }">
          {{ row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ t('permission.editPermission') }}
          </el-button>
          <el-popconfirm
            confirm-button-text="确认删除"
            cancel-button-text="我再想想"
            icon-color="red"
            title="你确定要删除吗?"
            @confirm="handleDelete(scope)"
          >
            <template #reference>
              <el-button type="danger" size="small">
                {{ t('permission.delete') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 操作弹出层 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'edit' ? '编辑角色全选' : '新建角色权限'"
    >
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="页面权限">
          <el-tree
            ref="treeRef"
            :check-strictly="checkStrictly"
            :data="routesTreeData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
            @check-change="TreeChangeHandel"
          />
        </el-form-item>
        <el-form-item label="其他权限">
          <div v-for="(item, index) in newOtherRolesObj" :key="index">
            <p>{{t(`route.${item.page as string}`)}}</p>
            <el-checkbox-group v-model="role.otherRole">
              <el-checkbox
                v-for="subItem in item.otherRoleList"
                :key="subItem.key"
                :label="subItem.key"
                >{{ subItem.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false">
          {{ t('permission.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  reactive,
  toRefs,
  ref,
  nextTick,
  getCurrentInstance
} from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus'
import { allRoute } from '@/router'
import { getRoutes, getRoles, delRole, updateRole, createRole } from '@/apis/roles'

export default defineComponent({
  setup() {
    interface Role {
      key: number
      name: String
      description: String
      routes: RouteRecordRaw[]
      otherRole: Array<String>[]
    }

    interface RoutesTreeData {
      children: RoutesTreeData[]
      title: String
      path: String
    }

    interface otherRoleList {
      key?: String
      label?: String
    }

    interface otherRolesObj {
      page?: String
      otherRoleList: otherRoleList[]
    }

    const defaultRole: Role = {
      key: 0,
      name: '',
      description: '',
      routes: [],
      otherRole: []
    }

    const { ctx } = getCurrentInstance() as any
    const treeRef = ref<HTMLInputElement | null>(null)
    const { t } = useI18n()
    const state = reactive({
      role: { ...defaultRole },
      reshapedRoutes: [] as RouteRecordRaw[],
      serviceRoutes: [] as RouteRecordRaw[],
      otherRolesObj: [] as Array<otherRolesObj>,
      newOtherRolesObj: [] as Array<otherRolesObj>,
      rolesList: [] as Role[],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      handleDelete: (scope: any) => {
        const { $index, row } = scope
        delRole(row.key).then(() => {
          state.rolesList.splice($index, 1)
          ElMessage.success('删除成功')
        })
      }
    })

    // const { flattenRoutes } = editRole()
    // 获取其他权限
    const otherRoles = (routes: RouteRecordRaw[]) => {
      // init
      state.otherRolesObj = []
      routes.forEach((route) => {
        // 如果有子页面就代表不是最后一级路由
        if (route.children) {
          otherRoles(route.children)
        } else if (route.meta && route.meta.other) {
          state.otherRolesObj = [
            ...state.otherRolesObj,
            {
              page: route.meta.title as String,
              otherRoleList: route.meta.other as otherRoleList[]
            }
          ]
        }
      })
    }

    const onlyOneShowingChildFunc = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
      let onlyOneChild = null
      const showingChild = children.filter((item) => !item.meta || !item.meta.hidden)
      // 当只有一个子路由时，默认显示子路由
      if (showingChild.length === 1) {
        onlyOneChild = showingChild[0]
        if (parent.path === '/' && parent.redirect) {
          // 剔除因为根路径 / 重定向后产生 双路径符的bug
          onlyOneChild.path = `${onlyOneChild.path.replace('//', '/')}`
        } else {
          onlyOneChild.path = `${parent.path}/${onlyOneChild.path}`
        }
        return onlyOneChild
      }

      // 如果没有子路由显示，则显示parent
      if (showingChild.length === 0) {
        onlyOneChild = { ...parent, path: '' }
        return onlyOneChild
      }
      return false
    }

    // 重新调整路由结构，使其看起来与边栏相同
    const getReshapeRoutes = (routes: RouteRecordRaw[], basePath?: string) => {
      const reshapeRoutes: RouteRecordRaw[] = []
      console.log(routes)
      routes.forEach((route) => {
        let newRoute = route
        // 跳过隐藏路线
        if (newRoute.meta) {
          const onlyOneShowingChild = onlyOneShowingChildFunc(newRoute.children, newRoute)
          if (newRoute.children && onlyOneShowingChild) {
            newRoute = onlyOneShowingChild
          }
          if (newRoute.meta && newRoute.meta.title) {
            console.log(newRoute)
            let path: String = `${basePath || ''}/${newRoute.path}`
            if (newRoute.children) {
              path = `${newRoute.path}`
            }
            const data: RouteRecordRaw = {
              path,
              meta: {
                title: newRoute.meta?.title
              }
            } as any as RouteRecordRaw
            // 递归生成子路由
            if (newRoute.children) {
              data.children = getReshapeRoutes(newRoute.children, data.path)
            }
            reshapeRoutes.push(data)
          }
        }
      })
      return reshapeRoutes
    }

    const generateTreeData = (routes: RouteRecordRaw[]) => {
      const data: RoutesTreeData[] = []
      console.log(routes)
      routes.forEach((route) => {
        const tmp: RoutesTreeData = {
          children: [],
          title: '',
          path: ''
        }
        tmp.title = route.meta ? t(`route.${route.meta.title}`).toString() : ''
        tmp.path = route.path
        if (route.children) {
          tmp.children = generateTreeData(route.children)
        }
        data.push(tmp)
        return true
      })
      return data
    }

    // 当树形菜单变化时触发
    const TreeChangeHandel = () => {
      state.newOtherRolesObj = []
      // 获取树形表单选择的节点
      const checkedKeys = (treeRef.value as any)?.getCheckedNodes()
      // 获取选中节点的其他权限
      state.otherRolesObj.forEach((item) => {
        const isContain = checkedKeys?.some((subItem: { title: string }) => {
          if (subItem.title === t(`route.${item.page as String}`)) {
            state.newOtherRolesObj.push(item)
            return true
          }
          return false
        })
        if (!isContain) {
          item.otherRoleList.forEach((removeItem) => {
            state.role.otherRole.forEach((otherRoleItem: unknown, index) => {
              if (otherRoleItem === removeItem.key) {
                state.role.otherRole.splice(index, 1)
              }
            })
          })
        }
      })
    }

    // 弹出层确认回调
    const confirmRole = async () => {
      const isEdit = state.dialogType === 'edit'
      // 获取树形表单选择的key
      state.role.routes = (treeRef.value as any).getCheckedKeys()
      if (isEdit) {
        await updateRole(state.role.key, { role: state.role }).then(async () => {
          for (let index = 0; index < state.rolesList.length; index += 1) {
            if (state.rolesList[index].key === state.role.key) {
              state.rolesList.splice(index, 1, { ...state.role })
              break
            }
          }
        })
      } else {
        await createRole({ role: state.role }).then(async (res) => {
          state.role.key = res?.data.key
          state.rolesList.push(state.role)
        })
      }

      const { description, key, name } = state.role
      state.dialogVisible = false
      ctx.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
          <div>Role Key: ${key}</div>
          <div>Role Name: ${name}</div>
          <div>Description: ${description}</div>
        `,
        type: 'success'
      })
    }
    const getServiceRoutes = () => {
      getRoutes().then((res) => {
        state.serviceRoutes = res?.data.routes as any as RouteRecordRaw[]
        state.reshapedRoutes = getReshapeRoutes(allRoute as any as RouteRecordRaw[])
      })
    }

    // 获取角色列表
    const getRolesList = () => {
      getRoles().then((res) => {
        state.rolesList = res?.data.items as any as Role[]
      })
    }

    onBeforeMount(() => {
      getServiceRoutes()
      getRolesList()
    })
    // 通过请求得到所有页面信息(左侧菜单栏一致)
    const routesTreeData = computed(() =>
      generateTreeData(state.reshapedRoutes as RouteRecordRaw[])
    )

    const handleCreateRole = () => {
      // Object.assign是浅拷贝 并把role设置为空对象
      state.role = { ...defaultRole }
      if (treeRef.value) {
        ;(treeRef.value as any).setCheckedKeys([])
      }
      state.dialogType = 'new'
      state.dialogVisible = true
      otherRoles(allRoute as RouteRecordRaw[])
      TreeChangeHandel()
    }

    const handleEdit = (scope: any) => {
      state.dialogType = 'edit'
      state.dialogVisible = true
      state.checkStrictly = true
      // 深拷贝
      state.role = cloneDeep(scope.row)
      // 遍历得到所有以选项
      otherRoles(allRoute as RouteRecordRaw[])
      nextTick(() => {
        const tree = treeRef.value as any
        // 选中对应的页面权限 这里就算后台返回的比页面路由多也不会多渲染
        tree.setCheckedKeys(state.role.routes)
        // 设置节点的检查状态不会影响其父节点和子节点
        state.checkStrictly = false
      })
    }
    return {
      t,
      confirmRole,
      ...toRefs(state),
      treeRef,
      routesTreeData,
      TreeChangeHandel,
      handleCreateRole,
      handleEdit
    }
  }
})
</script>

<style lang="less" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
