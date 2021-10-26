# .editorconfig 文件是用于维护开发成员代码风格一致的配置

# Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。
1
# npx husky-init  下载这个工具  这个Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令

# lint-staged —— 在 git 暂存的文件上运行 linters

# package.json下的 
1. "lint-staged": {
    "*.{vue,js,ts}": "eslint --fix"
  }, 行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix

# Commitizen 是用与提交时规定提交格式的插件

## Q&A

1. Q: `git cz` 不生效  

   A: 请全局安装 commitizen，命令：`npm install commitizen -g`

# .cz-config.js 时配置commit - msg 中文提示
# git Bash 里无法上下键选中选项时  可以通过数字选择 从1开始
# 单元测试
  1. https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/vite-vue3/image.2pg6u5vxed40.png
如上图，我们使用 VSCode / WebStrom / IDEA 等编辑器时，在单元测试文件中，IDE 会提示某些方法不存在（如 test、describe、it、expect等），安装 @types/jest 即可解决。
npm i @types/jest -D
 2. 如果在测试文件下TS文件不能识别.vue结尾的文件 可以将src下的env.d.ts文件复制一份到根目录(会不会产生文件识别错误暂时没看到) 但是能解决这个问题
