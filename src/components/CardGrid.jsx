import AppleMark from "./AppleMark.jsx";
import { cards } from "../data/cards";

export default function CardGrid({ selectedId, onSelect, symbol }) {
  return (
    <section id="cards" className="section">
      <div className="container">
        <div className="section-head">
          <h2>选择卡面额</h2>
          <p className="muted">所有卡密均为演示数据，下单不会产生任何真实交易。</p>
        </div>
        <div className="grid">
          {cards.map((card) => {
            const active = card.id === selectedId;
            return (
              <button
                key={card.id}
                type="button"
                className={`gift-card${active ? " active" : ""}`}
                style={{ background: card.gradient }}
                onClick={() => onSelect(card.id)}
                aria-pressed={active}
              >
                {card.tag && <span className="tag">{card.tag}</span>}
                <span className="gift-card-brand" aria-hidden="true">
                  <AppleMark size={20} color="#fff" />
                </span>
                <span className="gift-card-amount">
                  {symbol}
                  {card.amount}
                </span>
                <span className="gift-card-label">{card.label}</span>
                {active && <span className="check">已选择</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
