# 🗳️ 投票小程序 - LeanCloud 快速部署指南

## ✅ 方案优势

**不用写后端代码！不用配置 Worker！**

LeanCloud = 云端数据库（类似"云端 Excel"）
- ✅ 有免费套餐
- ✅ 国内访问快
- ✅ 有可视化界面管理数据
- ✅ 前端直接调用

---

## 📋 部署步骤（10 分钟）

### 1️⃣ 注册 LeanCloud

1. 访问 https://leancloud.cn
2. 注册账号（可用 GitHub 登录）
3. 实名认证（需要，国内要求）

### 2️⃣ 创建应用

1. 控制台 → 创建应用
2. 命名：`vote-app`
3. 选择「开发版」（免费）
4. 点击创建

### 3️⃣ 获取 App ID 和 Key

1. 进入刚创建的应用
2. 点击「设置」→「应用 Key」
3. 复制 **App ID** 和 **App Key**

### 4️⃣ 创建数据表

1. 点击「存储」→「创建 Class」
2. Class 名：`Vote`
3. 权限：**开启「无限制」**（允许匿名写入）
4. 点击创建

### 5️⃣ 更新前端配置

编辑 `index.html`，找到第 158-159 行：

```javascript
const LC_APP_ID = 'YOUR_APP_ID';
const LC_APP_KEY = 'YOUR_APP_KEY';
```

替换成你的：

```javascript
const LC_APP_ID = '你的 App ID';
const LC_APP_KEY = '你的 App Key';
```

### 6️⃣ 部署到 GitHub Pages

```bash
cd ~/.openclaw/workspace/projects/vote
git add -A
git commit -m "使用 LeanCloud 数据库"
git push -u origin master
```

然后在 GitHub 仓库设置启用 Pages。

---

## 🎯 完成！

部署后访问你的 GitHub Pages 链接，投票数据会自动保存到 LeanCloud！

---

## 📊 查看数据

1. 登录 LeanCloud 控制台
2. 进入应用 → 存储 → Vote 表
3. 可以看到所有投票记录

---

## 💰 免费额度

- ✅ 数据存储：1GB
- ✅ API 请求：3 万次/天
- ✅ 足够 1000 人投票

---

## 🔒 安全设置

在 LeanCloud 控制台设置：
1. 存储 → Vote 表 → 权限
2. 允许「无限制」读取（前端需要查询）
3. 允许「无限制」创建（用户投票）
4. **禁止**删除和更新（防止篡改）

---

**比 Cloudflare Worker 更简单！不需要写后端代码！** 🎉
