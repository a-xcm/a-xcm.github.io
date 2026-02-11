# 开发问题总结

## 项目简介

这是一个使用 VitePress 构建的开发问题总结文档网站，用于记录和分享开发过程中遇到的各种问题和解决方案。

## 项目结构

```
├── docs/                  # 文档目录
│   ├── .vitepress/        # VitePress 配置目录
│   │   ├── config.mts     # 站点配置文件
│   ├── src/               # 文档源码目录
│   │   ├── css样式/        # CSS 相关问题总结
│   │   ├── 三方js/         # 第三方 JS 库使用总结
│   │   ├── 其他/           # 其他开发问题总结
│   │   ├── public/         # 静态资源目录
│   │   ├── index.md        # 首页
├── .github/               # GitHub 相关配置
│   ├── workflows/          # GitHub Actions 工作流
│       ├── deploy.yml      # 自动部署到 GitHub Pages 的工作流
├── generate-routes.js      # 自动生成路由配置的脚本
├── package.json            # 项目配置文件
├── README.md               # 项目说明文件
```

## 功能特点

- **CSS技巧**：包含CSS控制文字超出省略号、文本换行等问题的解决方案
- **三方js**：包含二维码生成与解析等第三方库的使用方法
- **其他**：包含微信小程序H5判断、静态文件处理等其他开发问题
- **自动路由**：通过脚本自动生成路由配置，无需手动维护
- **自动部署**：配置了 GitHub Actions，推送到 main 分支时自动部署到 GitHub Pages

## 如何本地运行

1. **克隆仓库**

```bash
git clone https://github.com/a-xcm/a-xcm.github.io.git
cd a-xcm.github.io
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
npm run docs:dev
```

4. **访问网站**

打开浏览器，访问 `http://localhost:5173`

## 如何部署

项目配置了 GitHub Actions 自动部署，当你将代码推送到 main 分支时，工作流会自动执行以下步骤：

1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖
4. 构建文档
5. 部署到 GitHub Pages

部署成功后，你可以通过 `https://a-xcm.github.io` 访问网站。

## 如何添加新内容

1. **添加新文档**

在 `docs/src/` 目录下的对应分类中创建新的 `.md` 文件。

2. **更新路由配置**

运行以下命令，自动更新路由配置：

```bash
node generate-routes.js
```

3. **推送代码**

```bash
git add .
git commit -m "添加新内容"
git push origin main
```

## 贡献指南

欢迎贡献你的开发问题和解决方案！请按照以下步骤贡献：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目使用 ISC 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

如果有任何问题或建议，欢迎通过 GitHub Issues 与我联系。

---

感谢使用本项目！希望它能对你的开发工作有所帮助。
