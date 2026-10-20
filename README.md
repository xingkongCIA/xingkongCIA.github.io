# 纸间 · Hugo 个人博客

公开站点预期地址：https://xingkongcia.github.io/

## 第一次上线
1. 在仓库 Settings → Pages → Build and deployment 中，Source 选择 **GitHub Actions**。
2. 在 Actions 中查看 Build and deploy Hugo；如有需要点击 Run workflow。
3. 等待部署成功后访问上述地址。本 README 中的地址不代表已经部署成功。

## 本地使用（Windows PC 同样适用）
安装 Git、Python 3.11+ 以及 Hugo **0.147.9** 标准版；从 Hugo 官方 GitHub Releases 下载与系统匹配的文件，并将 hugo 加入 PATH。
在 PowerShell 中：
```powershell
git clone https://github.com/xingkongCIA/xingkongCIA.github.io.git
cd xingkongCIA.github.io
hugo server --buildDrafts
```
浏览器打开 http://localhost:1313/ 。此命令仅供本机预览。

## 添加公开文章
```powershell
hugo new content posts/my-story/index.md
```
编辑生成文件。需要发布时设置 draft: false、public: true，再运行：
```powershell
python scripts/check_public.py
hugo --minify --panicOnWarning
git add .
git commit -m "Publish a new story"
git push
```
文章图片放在同一 index.md 目录中，以相对路径引用。完整预览确认后再提交。

**源代码仓库也公开。draft=true 不是隐私保护。未准备公开的草稿请放在独立私有仓库，不能先提交到本仓库。**
public 标记只是流程检查，不是访问控制。检查脚本只做基本检查，无法判断敏感正文或图片。
不应给私人图片使用公开图床。

## 目录与外观
- content/posts/：公开文章；content/about.md：关于页面
- static/css/site.css：颜色、字体、响应式样式
- layouts/：内置模板，无外部主题或 npm 依赖
- hugo.toml：名称、描述与 URL；页头品牌文字同时在 baseof.html
- 搜索仅索引公开 posts；RSS 同样只包含已构建内容

## 私人写作
在 GitHub 网页创建另一个仓库 private-writing，必须选择 **Private**，不要启用 Pages。
在 PC 的相邻目录克隆，不要嵌套在此博客目录。通过登录 GitHub 阅读。
建议目录：journal/、fiction/、essays/、assets/，README.md 作为索引。
云端 Codex 处理私人正文前应自行确认服务数据设置。最敏感内容先加密，GitHub 私有仓库不等同端到端加密。

## 备份与恢复
每周将两个本地仓库（包括隐藏的 .git 和附件）复制到加密移动硬盘；备份不放本仓库。
GitHub 可重新 clone。独立离线备份用于账号或远端出问题时恢复。每季度做一次恢复演练。
备份前确认本地改动已经保存；git bundle 不包含未提交文件及 Git LFS 实体。

## 更新与回滚
每季度检查 GitHub Actions、Hugo 安全与兼容性；先在分支构建再更新。
工作流固定 Hugo 版本，Actions 固定主版本，后续可通过 Dependabot 审阅更新。
错误发布用 git revert 撤销提交后推送，等待重新部署。
如果泄露私人信息，仅 revert 不足以抹去历史或缓存，应立即处理相关泄露与凭据。

## 成本与可用性
不依赖本地 PC 持续开机，无服务器和自购域名要求。受 GitHub 免费额度、服务条款和可用性限制。
暂不启用评论、第三方统计和外部字体，减少维护。
