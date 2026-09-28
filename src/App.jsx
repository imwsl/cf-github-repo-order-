import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import CardGrid from "./components/CardGrid.jsx";
import OrderPanel from "./components/OrderPanel.jsx";
import SuccessModal from "./components/SuccessModal.jsx";
import AppleMark from "./components/AppleMark.jsx";
import { cards, regions } from "./data/cards";

const faqs = [
  {
    q: "这是真实的购买页面吗？",
    a: "不是。本站是用于展示 Cloudflare Pages + GitHub 自动部署流程的演示项目，所有商品、价格与订单均为示例数据，不会收取任何费用。",
  },
  {
    q: "提交订单后会发生什么？",
    a: "页面只会在本地生成一个以 DEMO- 开头的模拟订单号，不会向任何服务器发送数据，也不会发放卡密。",
  },
  {
    q: "会收集我的支付信息吗？",
    a: "不会。演示环境未接入支付通道，也没有填写银行卡号的入口。请勿在演示页面输入任何真实敏感信息。",
  },
  {
    q: "如何部署到 Cloudflare？",
    a: "把仓库连接到 Cloudflare Pages，构建命令使用 npm run build，输出目录使用 dist，之后每次 push 都会触发自动部署。",
  },
];

export default function App() {
  const [selectedId, setSelectedId] = useState(cards[2].id);
  const [order, setOrder] = useState(null);
  const region = useMemo(() => regions[0], []);

  return (
    <div className="app">
      <div className="demo-banner" role="note">
        演示站点 · 仅用于界面与部署流程演示，不会产生真实订单或扣款
      </div>

      <Header />

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="pill">Cloudflare Pages 演示项目</span>
              <h1>
                一键下单
                <AppleMark size={34} color="#111" />
                Apple Gift Card
              </h1>
              <p>
                App Store、iCloud、Apple Music、Arcade 通用。
                选择面额、填写邮箱、生成演示订单，三步完成。
              </p>
              <div className="hero-actions">
                <a className="btn-primary" href="#order">
                  立即下单（演示）
                </a>
                <a className="btn-ghost" href="#cards">
                  查看面额
                </a>
              </div>
              <ul className="hero-points">
                <li>演示数据，无真实交易</li>
                <li>多地区面额：US / UK / JP</li>
                <li>适配手机与桌面</li>
              </ul>
            </div>
            <div className="hero-art" aria-hidden="true">
              {cards.slice(1, 4).map((c, i) => (
                <div
                  key={c.id}
                  className="hero-card"
                  style={{
                    background: c.gradient,
                    transform: `rotate(${(i - 1) * 6}deg) translateY(${i * 18}px)`,
                  }}
                >
                  <AppleMark size={22} color="#fff" />
                  <span>
                    {region.symbol}
                    {c.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CardGrid
          selectedId={selectedId}
          onSelect={setSelectedId}
          symbol={region.symbol}
        />

        <OrderPanel
          selectedId={selectedId}
          onSelectCard={setSelectedId}
          onSuccess={setOrder}
        />

        <section id="faq" className="section">
          <div className="container">
            <div className="section-head">
              <h2>常见问题</h2>
              <p className="muted">关于这个演示站点你需要知道的几件事。</p>
            </div>
            <div className="faq">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="brand-name">GiftCard Store</div>
            <p className="muted">
              演示项目，与 Apple Inc. 无任何关联。Apple、App Store 为 Apple
              Inc. 的商标。
            </p>
          </div>
          <div className="footer-meta">
            <span>React + Vite</span>
            <span>Deployed on Cloudflare Pages</span>
            <span>© {new Date().getFullYear()} Demo only</span>
          </div>
        </div>
      </footer>

      <SuccessModal order={order} onClose={() => setOrder(null)} />
    </div>
  );
}
