# 张钦睿 · 个人主页

根据个人简历制作的静态主页，面向 GitHub Pages。纯 HTML、CSS、JavaScript，无 npm 依赖、无构建步骤、无第三方 CDN。

## 本地预览

在当前目录运行：

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory public
```

然后访问 http://127.0.0.1:4173 。也可直接打开 `public/index.html`，复制邮箱功能在不支持剪贴板的环境下会提示手动复制。

## 更新内容

- `public/profile.js`：名字、英文名、介绍、邮箱与 GitHub 用户名。
- `public/index.html`：学业数据、项目卡片、教育背景和技能。
- `public/app.js`：三个项目的详情文字和交互。
- `public/styles.css`：颜色与响应式布局。
- `public/assets/resume.pdf`：公开下载的简历，更新时用同名文件替换。

页面所有经历与指标来自用户提供的简历。机器人图与项目曲线为技术示意，不是项目实拍或实验图。没有加入尚未提供的项目源码链接。

## 部署到 AvidDragon.github.io

1. 在 GitHub 的 AvidDragon 账号下创建公开仓库 `AvidDragon.github.io`。如已存在，应先合并保留原有内容。
2. 将本目录的全部内容提交到仓库 `main` 分支，包含 `.github/workflows/pages.yml`。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 在 **Actions** 页检查 `Deploy personal homepage to GitHub Pages`，必要时点击 **Run workflow**。
5. 工作流成功后访问 https://aviddragon.github.io/ 。该地址是预期部署地址，是否上线以 Actions 的成功结果为准。

后续每次向 `main` 推送更新都会自动部署。资源全部使用相对路径，也适用于项目仓库子路径。

参考：[GitHub Pages 官方部署文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
