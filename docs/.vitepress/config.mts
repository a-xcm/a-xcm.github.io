import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "开发问题总结",
  description: "开发中遇到的问题总结",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" }
    ],

    sidebar: [
      {
        text: "开发问题总结",
        items: [
          {
            text: "CSS技巧",
            link: "/css样式/文字溢出",
            items: [
              {
                text: "文字溢出",
                link: "/css样式/文字溢出"
              },
              {
                text: "文本换行",
                link: "/css样式/文本换行"
              }
            ]
          },
          {
            text: "三方js",
            link: "/三方js/二维码生成与解析",
            items: [
              {
                text: "二维码生成与解析",
                link: "/三方js/二维码生成与解析"
              }
            ]
          },
          {
            text: "其他",
            link: "/其他/微信小程序H5判断",
            items: [
              {
                text: "微信小程序H5判断",
                link: "/其他/微信小程序H5判断"
              },
              {
                text: "静态文件",
                link: "/其他/静态文件"
              }
            ]
          }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: "目录"
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/a-xcm/a-xcm.github.io" }
    ]
  },
  srcDir: "src"
})
