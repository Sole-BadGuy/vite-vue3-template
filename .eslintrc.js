module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended', // 添加 prettier 插件
    'plugin:jest/recommended' // 消除eslint对单元测试的校验
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'off', // 读不懂 可能的意思就是忽略无法解析的路径文件吧
    'import/extensions': 'off', // 忽略尾缀
    'import/no-absolute-path': 'off', // 可以使用绝对路径导入模块
    'import/no-extraneous-dependencies': 'off', // 关闭禁止使用无关的包
    'vue/no-multiple-template-root': 'off', // 关闭校验 vue根标签
    'no-param-reassign': [
      // 禁止重新分配函数参数
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config'] // 设置可以重新分配函数的参数名称
      }
    ],
    // 注意你必须禁用基本规则，因为它可以报告不正确的错误
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // ts 文件中eslit枚举校验过不去 使用ts校验
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  },
  settings: {}
}
