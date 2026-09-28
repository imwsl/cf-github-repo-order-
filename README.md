# Apple Gift Card 演示下单站

一个使用 **React + Vite** 构建的 Apple Gift Card 下单演示站点，可通过 **GitHub + Cloudflare Pages** 自动部署。

> ⚠️ 本项目仅用于演示界面与部署流程。不会收集支付信息、不会产生真实订单、不会发放卡密。站点内所有商品、价格、订单均为示例数据。

## 功能

- 面额选择：$10 / $25 / $50 / $100 / $200 / $500，带 Apple 风格卡面
- 地区切换：美国区 / 英国区 / 日本区
- 演示下单表单：数量、接收邮箱、支付方式（仅展示）、备注，含表单校验
- 提交后本地生成 `DEMO-` 开头的模拟订单号并弹出回执
- 响应式布局，适配桌面与手机

## 本地开发

```bash
npm install
npm run dev
```

打开 http://localhost:5173 查看。

## 构建

```bash
npm run build   # 产物输出到 dist/
npm run preview # 本地预览生产构建
```

## 部署到 Cloudflare Pages（推荐，Git 集成）

1. 把本仓库推送到 GitHub（已完成：`git@github.com:imwsl/cf-github-repo-order-.git`）。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
3. 选择本仓库，配置构建参数：
   - **Framework preset**: `Vite`（或 None）
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 点击 **Save and Deploy**。之后每次 `git push` 都会触发自动构建与部署。

## 使用 Wrangler 手动部署（可选）

```bash
npm install
npx wrangler login
npm run deploy   # 构建并上传 dist/ 到 Cloudflare Pages
```

项目已包含 `wrangler.toml`（`pages_build_output_dir = "dist"`），无需额外配置。

## 目录结构

```
├── index.html
├── wrangler.toml            # Cloudflare Pages 配置
├── vite.config.js
└── src
    ├── App.jsx              # 页面结构
    ├── main.jsx             # 入口
    ├── styles.css           # 全局样式
    ├── data/cards.js        # 面额与地区示例数据
    └── components
        ├── AppleMark.jsx    # Apple 图标（SVG）
        ├── Header.jsx
        ├── CardGrid.jsx     # 面额卡片
        ├── OrderPanel.jsx   # 下单表单 + 订单摘要
        └── SuccessModal.jsx # 模拟订单回执
```

## 声明

本站为演示项目，与 Apple Inc. 无任何关联。Apple、App Store、Apple Gift Card 是 Apple Inc. 的商标。
