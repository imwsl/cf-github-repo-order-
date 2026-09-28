import AppleMark from "./AppleMark.jsx";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-logo" aria-hidden="true">
            <AppleMark size={22} color="#fff" />
          </span>
          <div>
            <div className="brand-name">GiftCard Store</div>
            <div className="brand-sub">Apple Gift Card 演示商城</div>
          </div>
        </div>
        <nav className="nav">
          <a href="#cards">选择面额</a>
          <a href="#order">下单</a>
          <a href="#faq">常见问题</a>
        </nav>
      </div>
    </header>
  );
}
