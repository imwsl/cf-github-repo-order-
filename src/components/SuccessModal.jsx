export default function SuccessModal({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-badge">演示成功</div>
        <h3>已生成模拟订单</h3>
        <p className="muted">
          这不是真实交易，没有卡密发放，也没有任何扣款。
        </p>
        <dl className="receipt">
          <div>
            <dt>订单号</dt>
            <dd className="mono">{order.id}</dd>
          </div>
          <div>
            <dt>商品</dt>
            <dd>
              Apple Gift Card {order.currency}
              {order.card.amount} × {order.quantity}
            </dd>
          </div>
          <div>
            <dt>地区</dt>
            <dd>{order.region}</dd>
          </div>
          <div>
            <dt>接收邮箱</dt>
            <dd>{order.email}</dd>
          </div>
          <div>
            <dt>支付方式</dt>
            <dd>{order.payment}</dd>
          </div>
          {order.note && (
            <div>
              <dt>备注</dt>
              <dd>{order.note}</dd>
            </div>
          )}
          <div className="summary-total">
            <dt>合计</dt>
            <dd>
              {order.currency}
              {order.total}
            </dd>
          </div>
          <div>
            <dt>提交时间</dt>
            <dd>{order.createdAt}</dd>
          </div>
        </dl>
        <button className="btn-primary" type="button" onClick={onClose}>
          返回商城
        </button>
      </div>
    </div>
  );
}
