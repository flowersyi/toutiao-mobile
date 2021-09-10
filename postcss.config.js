module.exports = {
  plugins: {
    // autoprefixer 是一个自动添加浏览器前缀的 PostCss 插件，
    // browsers 用来配置兼容的浏览器版本信息，但是写在这里的话会引起编译器警告。
    // 警告意思就是说你应该将 browsers 选项写到 package.json 或 .browserlistrc 文件中。

    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 转换的基准值，以设计稿为准
      // 375: 37.5
      // 750: 75
      // Vant 组件的样式是以 375 设计稿开发的
      // 我们的设计稿
      // 375，量多少，写多少
      // 750，量出来的尺寸 ÷ 2
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
