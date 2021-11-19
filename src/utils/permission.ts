import { useStore } from '@/store'

export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const { roles } = useStore().state.user
    const permissionRoles = value
    const hasPermission = roles.some((role) => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  }
  console.error("need roles! Like v-permission=\"['admin','editor']\"")
  return false
}

export const checkPermissionTest = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const { roles } = useStore().state.user
    const permissionRoles = value
    const hasPermission = roles.some((role) => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  }
  console.error("need roles! Like v-permission=\"['admin','editor']\"")
  return false
}
