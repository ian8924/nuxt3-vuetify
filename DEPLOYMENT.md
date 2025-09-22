# Vercel 三环境部署指南

这个项目已经配置好了 Vercel 的三环境部署：**Local**、**Dev** 和 **Prod**。以下是详细的使用说明：

## 环境说明

- **Local (本地环境)**: 本地开发环境，用于日常开发和调试
- **Dev (开发环境)**: 远程开发环境，用于功能测试和团队协作
- **Prod (生产环境)**: 正式生产环境，面向最终用户

## 分支管理策略

- `main` 分支 → **Prod** 生产环境
- `dev` 分支 → **Dev** 开发环境
- `feature/*` 分支 → 本地开发，可推送到 dev 分支

## 环境变量配置

### 本地开发 (Local)

复制 `.env.example` 文件为 `.env`：

```bash
cp .env.example .env
```

### Vercel 环境变量配置

#### Dev 环境 (dev 分支)

在 Vercel 控制台为 `dev` 分支设置：

- `NODE_ENV` = `dev`
- `NUXT_PUBLIC_API_BASE` = `https://your-dev-domain.vercel.app/api`
- `NUXT_PUBLIC_BASE_URL` = `https://your-dev-domain.vercel.app`
- `NUXT_PUBLIC_ENVIRONMENT` = `dev`
- `DATABASE_URL` = `postgresql://dev-server:5432/myapp_dev`
- `API_SECRET_KEY` = `your_dev_secret_key`

#### Prod 环境 (main 分支)

在 Vercel 控制台为 `main` 分支设置：

- `NODE_ENV` = `prod`
- `NUXT_PUBLIC_API_BASE` = `https://your-production-domain.vercel.app/api`
- `NUXT_PUBLIC_BASE_URL` = `https://your-production-domain.vercel.app`
- `NUXT_PUBLIC_ENVIRONMENT` = `prod`
- `DATABASE_URL` = `postgresql://prod-server:5432/myapp_prod`
- `API_SECRET_KEY` = `your_prod_secret_key`

## 开发工作流

### 1. 本地开发

```bash
# 启动本地开发服务器
npm run dev:local

# 或者简化命令
npm run dev
```

### 2. 开发环境测试

```bash
# 推送到 dev 分支，自动部署到 dev 环境
git checkout dev
git merge feature/your-feature
git push origin dev
```

### 3. 生产环境发布

```bash
# 推送到 main 分支，自动部署到生产环境
git checkout main
git merge dev
git push origin main
```

## 构建和部署命令

### 本地构建测试

```bash
# 本地环境构建
npm run build:local

# 开发环境构建
npm run build:dev

# 生产环境构建
npm run build:prod
```

### 手动部署

```bash
# 部署到开发环境
npm run deploy:dev

# 部署到生产环境
npm run deploy:prod
```

## 在代码中使用环境配置

```typescript
// 在组件中使用
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const environment = config.public.environment;
const nodeEnv = config.public.nodeEnv;

// 根据环境执行不同逻辑
if (environment === "local") {
  // 本地开发逻辑
} else if (environment === "dev") {
  // 开发环境逻辑
} else if (environment === "prod") {
  // 生产环境逻辑
}
```

## 环境特性

### Local 环境

- 启用所有开发工具
- 热重载和调试功能
- 详细的错误信息
- 本地数据库连接

### Dev 环境

- 启用开发工具
- 测试数据库
- 功能验证
- 团队协作测试

### Prod 环境

- 关闭开发工具
- 性能优化
- 生产数据库
- 错误监控

## Vercel 项目设置

1. **导入项目到 Vercel**
2. **设置分支部署规则**：
   - Production Branch: `main`
   - Preview Branches: `dev`
3. **配置环境变量**（分别为 Production 和 Preview 设置）
4. **构建设置**：
   - Build Command: `npm run build:prod`
   - Output Directory: `.output`

## 监控和维护

### 日志监控

- Local: 控制台输出
- Dev: Vercel 开发环境日志
- Prod: Vercel 生产环境日志 + 外部监控服务

### 性能监控

- 使用 Vercel Analytics
- 配置 Core Web Vitals 监控
- 设置错误追踪（推荐 Sentry）

## 回滚策略

### 快速回滚

1. 在 Vercel 控制台点击 "Rollback"
2. 选择之前的稳定版本

### 代码回滚

```bash
# 回滚到上一个提交
git revert HEAD
git push origin main
```

## 注意事项

1. **环境隔离**: 确保各环境数据库和服务完全隔离
2. **敏感信息**: 所有敏感配置都通过环境变量管理
3. **测试流程**: Dev → Prod 的严格测试流程
4. **依赖管理**: 及时更新和测试依赖包
5. **分支保护**: 为 main 分支设置保护规则

## 故障排除

### 常见问题

1. **构建失败**: 检查环境变量配置
2. **运行时错误**: 查看 Vercel 函数日志
3. **环境变量未生效**: 确认 Vercel 控制台配置正确

### 调试技巧

```bash
# 本地模拟不同环境
NODE_ENV=dev npm run dev
NODE_ENV=prod npm run build
```
