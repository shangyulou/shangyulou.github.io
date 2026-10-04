# shangyulou · 学术主页

网站地址：https://shangyulou.github.io/

简洁的中英双语学术主页。原生 HTML、CSS 和 JavaScript，无依赖、无构建步骤、无追踪器，可部署在 GitHub Pages。包含响应式布局、键盘导航、减少动画偏好支持和打印样式。

## 更新内容

只需修改 `profile.js` 中的个人资料，提交到 `main` 分支，GitHub Pages 会重新发布。未填写学校、邮箱、简历时不会出现虚假链接。初版仅使用公开 GitHub 用户名，未填写的研究和经历显示「即将更新」。

- `name`：公开姓名；`initials`：头像字母。
- `role` / `affiliation`：身份 / 学校或机构。
- `introduction` / `about`：简介 / 关于我。
- `email`：希望公开的邮箱。不要填不想公开的个人信息。
- `github` / `scholar` / `orcid`：公开主页的完整 HTTPS 链接。
- `cv`：简历链接，如 `./cv.pdf`（需上传同名文件）。
- 文本可写字符串，或 `{ zh: '中文内容', en: 'English content' }`。

研究方向示例（将示例替换为真实信息后填入 `research` 数组）：

```js
{ title: { zh: '你的研究方向', en: 'Your research area' }, description: { zh: '研究简介', en: 'A short description' } }
```

论文示例（填入 `publications` 数组）：

```js
{
  title: 'Your paper title',
  authors: 'Author One, Author Two',
  year: 2026,
  venue: 'Journal or Conference',
  keywords: ['keyword'],
  paper: 'https://example.org/paper',
  code: '',
  project: '',
  bibtex: '@article{key,\n  title={Your paper title},\n  year={2026}\n}'
}
```

添加真实论文后会自动出现标题、作者、关键词搜索和年份筛选。BibTeX 可展开复制。论文按年份从新到旧显示。

经历示例（填入 `experience` 数组）：

```js
{ period: '2024–2026', title: '你的学位或职位', institution: '你的学校或机构', description: '简短说明' }
```

## 本地预览

直接打开 `index.html`，或者在本目录执行：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

然后访问 http://127.0.0.1:8000/ 。发布文件只有 `index.html`、`profile.js`、`site.js` 和 `.nojekyll`。

## GitHub Pages

仓库名：`shangyulou.github.io`。仓库 Settings → Pages → Deploy from a branch → `main` / `(root)` → Save。

[GitHub 官方发布说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
