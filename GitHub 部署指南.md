# 🗳️ 投票小程序 - GitHub 部署指南

## ✅ 方案优势

**不用注册新账号！用你的 GitHub 就行！**

- ✅ 数据存在你的 GitHub 仓库
- ✅ 完全免费
- ✅ 可以直接看到投票数据文件
- ✅ 已有 GitHub 账号即可

---

## 📋 部署步骤（5 分钟）

### 1️⃣ 创建 Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击「Generate new token (classic)」
3. 命名：`vote-app`
4. 勾选权限：**`repo`**（完全控制）
5. 点击「Generate token」
6. **复制 Token**（只显示一次，保存好！）

### 2️⃣ 创建数据仓库

1. 访问 https://github.com/new
2. 仓库名：`vote-data`
3. 设为 **Public**
4. 勾选「Add a README file」
5. 点击「Create repository」

### 3️⃣ 初始化 votes.json

1. 进入刚创建的仓库
2. 点击「Add file」→「Create new file」
3. 文件名：`votes.json`
4. 内容：`[]`
5. 点击「Commit changes」

### 4️⃣ 更新前端配置

编辑 `index.html`，找到第 156-158 行：

```javascript
const GITHUB_OWNER = 'ICEMIDFIRE';
const GITHUB_REPO = 'vote-data';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';
```

替换成：
- `GITHUB_OWNER`: 你的 GitHub 用户名
- `GITHUB_REPO`: `vote-data`
- `GITHUB_TOKEN`: 刚才创建的 Token

### 5️⃣ 部署到 GitHub Pages

```bash
cd ~/.openclaw/workspace/projects/vote
git add -A
git commit -m "使用 GitHub 存储投票数据"
git push -u origin master
```

---

## 🎯 完成！

访问你的 GitHub Pages 链接，投票数据会保存到你的 `vote-data` 仓库！

---

## 📊 查看数据

1. 访问 https://github.com/你的用户名/vote-data
2. 打开 `votes.json`
3. 可以看到所有投票记录

---

## ⚠️ 安全提示

**Token 暴露问题**：

前端代码中的 Token 是公开的，任何人都能看到。解决方案：

1. **短期使用**：投票结束后删除 Token
2. **限制权限**：只给这个仓库的权限
3. **定期更换**：用完就删

---

## 💡 更好的方案

如果觉得 Token 不安全，可以：

1. 用 **Cloudflare Workers**（之前那个方案）
2. 用 **腾讯云云开发**（有免费额度）

但 GitHub 方案最简单，不用注册新账号！

---

**快去创建 Token 吧！创建好后告诉我，我帮你更新配置！** 🚀
