# 🗳️ 投票小程序 - 部署说明

## 问题分析

**原 BUG**: 投票数据使用 `localStorage` 存储，导致：
- ❌ 数据只保存在用户本地浏览器
- ❌ 不同用户之间无法看到彼此的投票
- ❌ 管理员无法查看统计结果

## 解决方案

使用 **Cloudflare Workers + KV 存储** 实现云端数据同步

---

## 📋 部署步骤

### 1️⃣ 创建 Cloudflare 账号

1. 访问 https://workers.cloudflare.com
2. 注册免费账号
3. 验证邮箱

### 2️⃣ 创建 KV 命名空间

1. 登录 Cloudflare Dashboard
2. 进入 Workers & Pages → KV
3. 点击「Create a namespace」
4. 命名为 `vote-data`
5. 复制 KV Namespace ID

### 3️⃣ 部署 Worker

1. 进入 Workers & Pages → Create Application
2. 点击「Create Worker」
3. 命名：`vote-api`
4. 点击「Deploy」

### 4️⃣ 绑定 KV

1. 进入 Worker → Settings → Variables
2. 添加绑定：
   - Variable name: `VOTE_KV`
   - Type: KV Namespace
   - Namespace: 选择 `vote-data`

### 5️⃣ 粘贴 Worker 代码

将 `worker.js` 的内容粘贴到 Worker 编辑器
点击「Save and Deploy」

### 6️⃣ 更新前端配置

编辑 `index.html`，修改：
```javascript
const API_BASE = 'https://vote-api.你的账号.workers.dev';
```

### 7️⃣ 部署前端

将 `index.html` 上传到 GitHub Pages 或任何静态托管服务

---

## 🔧 本地测试

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 本地测试
wrangler dev
```

---

## 📊 数据管理

### 查看投票数据
1. 访问前端页面
2. 点击「管理员查看结果」
3. 输入密码：`M123654`

### 导出数据
- 点击「📥 导出 Excel」下载 CSV 文件

### 清空数据
```bash
# 通过 Wrangler CLI
wrangler kv:key delete --namespace-id=<ID> --key="votes"
```

---

## 💰 费用说明

Cloudflare Workers 免费额度：
- ✅ 每天 100,000 次请求
- ✅ 1000 次 KV 读取/天
- ✅ 足够 500 人投票使用

---

## 🔒 安全说明

- ✅ 密码存储在前端（简单应用足够）
- ✅ CORS 限制仅允许指定域名访问
- ✅ 每人只能投票一次（基于 voterId）

---

**部署完成后，所有用户的投票数据将实时同步！** 🎉
