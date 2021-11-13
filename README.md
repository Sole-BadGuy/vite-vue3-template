# .editorconfig 文件是用于维护开发成员代码风格一致的配置

# Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1

# npx husky-init 下载这个工具 这个 Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令

# lint-staged —— 在 git 暂存的文件上运行 linters

# package.json 下的

1. "lint-staged": {
   "\*.{vue,js,ts}": "eslint --fix"
   }, 行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix

# Commitizen 是用与提交时规定提交格式的插件

## Q&A

1. Q: `git cz` 不生效

   A: 请全局安装 commitizen，命令：`npm install commitizen -g`

# .cz-config.js 时配置 commit - msg 中文提示

# git Bash 里无法上下键选中选项时 可以通过数字选择 从 1 开始

# 单元测试

1. https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/vite-vue3/image.2pg6u5vxed40.png
   如上图，我们使用 VSCode / WebStrom / IDEA 等编辑器时，在单元测试文件中，IDE 会提示某些方法不存在（如 test、describe、it、expect 等），安装 @types/jest 即可解决。
   npm i @types/jest -D
2. 如果在测试文件下 TS 文件不能识别.vue 结尾的文件 可以将 src 下的 env.d.ts 文件复制一份到根目录(会不会产生文件识别错误暂时没看到) 但是能解决这个问题
3. 如果单元测试报 confing 为 undefined 请注意版本问题

# ref toRef toRefs 区别

ref 和 toRef 的区别
(1). ref 本质是拷贝，修改响应式数据不会影响原始数据；toRef 的本质是引用关系，修改响应式数据会影响原始数据
(2). ref 数据发生改变，界面会自动更新；toRef 当数据发生改变是，界面不会自动更新
(3). toRef 传参与 ref 不同；toRef 接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
有的时候，我们希望将对象的多个属性都变成响应式数据，并且要求响应式数据和原始数据关联，并且更新响应式数据的时候不更新界面，就可以使用 toRefs，用于批量设置多个数据为响应式数据。(toRef 一次仅能设置一个数据)
toRefs 接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用 toRef 执行
# "vue-i18n": "^9.0.0-beta.16",
 vue-i18n 单纯9.0.0版本 他下面有一个ts文件在github自动部署时会报错
 建议下载9.0.0-beta.16版本

# 插件简介
  path-to-regexp  这个插件是用来处理url中地址与参数的 通过正则匹配
  screenfull   是否全屏
