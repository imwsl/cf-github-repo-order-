import { useMemo, useState } from "react";
import AppleMark from "./AppleMark.jsx";
import { cards, regions } from "../data/cards";

const paymentMethods = [
  { id: "card", label: "信用卡 / 借记卡（演示）" },
  { id: "alipay", label: "支付宝（演示）" },
  { id: "usdt", label: "USDT / 加密货币（演示）" },
];

export default function OrderPanel({ selectedId, onSelectCard, onSuccess }) {
  const [regionId, setRegionId] = useState(regions[0].id);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const region = useMemo(
    () => regions.find((r) => r.id === regionId) ?? regions[0],
    [regionId]
  );
  const card = useMemo(
    () => cards.find((c) => c.id === selectedId) ?? cards[0],
    [selectedId]
  );
  const total = card.amount * quantity;

  function validate() {
    const next = {};
    if (!email.trim()) {
      next.email = "请填写接收卡密的邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "邮箱格式不正确";
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      next.quantity = "数量需为 1 - 20 之间的整数";
    }
    if (!agree) {
      next.agree = "请先确认已了解这是演示站点";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const order = {
        id: `DEMO-${new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: email.trim(),
        region: region.label,
        card,
        quantity,
        total,
        currency: region.symbol,
        payment: paymentMethods.find((p) => p.id === payment)?.label ?? "",
        note: note.trim(),
        createdAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      };
      setSubmitting(false);
      setQuantity(1);
      setNote("");
      setAgree(false);
      onSuccess(order);
    }, 900);
  }

  return (
    <section id="order" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2>填写演示订单</h2>
          <p className="muted">
            不会收集任何真实支付信息，提交后仅在本页展示一个模拟订单号。
          </p>
        </div>

        <form className="order-layout" onSubmit={handleSubmit} noValidate>
          <div className="panel">
            <label className="field">
              <span className="field-label">卡面额</span>
              <select
                value={card.id}
                onChange={(e) => onSelectCard(e.target.value)}
              >
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {region.symbol}
                    {c.amount} · {c.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field-label">地区</span>
                <select
                  value={regionId}
                  onChange={(e) => setRegionId(e.target.value)}
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">数量</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                {errors.quantity && (
                  <span className="field-error">{errors.quantity}</span>
                )}
              </label>
            </div>

            <label className="field">
              <span className="field-label">接收邮箱（演示用）</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </label>

            <label className="field">
              <span className="field-label">支付方式</span>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                {paymentMethods.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">备注（可选）</span>
              <textarea
                rows="3"
                placeholder="例如：需要 3 张不同卡面，节日祝福等"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
          </div>

          <aside className="summary">
            <div
              className="summary-card"
              style={{ background: card.gradient }}
            >
              <span className="summary-brand" aria-hidden="true">
                <AppleMark size={26} color="#fff" />
              </span>
              <span className="summary-amount">
                {region.symbol}
                {card.amount}
              </span>
              <span className="summary-label">Apple Gift Card · {region.currency}</span>
            </div>

            <dl className="summary-list">
              <div>
                <dt>面额</dt>
                <dd>
                  {region.symbol}
                  {card.amount}
                </dd>
              </div>
              <div>
                <dt>数量</dt>
                <dd>× {quantity || 0}</dd>
              </div>
              <div className="summary-total">
                <dt>合计</dt>
                <dd>
                  {region.symbol}
                  {total}
                </dd>
              </div>
            </dl>

            <label className="agree">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>我了解这是演示站点，不会产生真实订单</span>
            </label>
            {errors.agree && <span className="field-error">{errors.agree}</span>}

            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "正在生成演示订单…" : "提交演示订单"}
            </button>
            <p className="fineprint">
              演示环境不接入任何支付通道，点击后不会扣款。
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}
