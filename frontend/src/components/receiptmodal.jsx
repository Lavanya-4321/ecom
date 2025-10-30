export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Thank you, {receipt.user.name}!</h2>
        <div>Receipt:</div>
        <ul>
          {receipt.items.map((it, i) => (
            <li key={i}>{it.qty}x {it.name} (₹{it.price}) = ₹{it.subtotal.toFixed(2)}</li>
          ))}
        </ul>
        <div><b>Total: ₹{receipt.total.toFixed(2)}</b></div>
        <div>{new Date(receipt.timestamp).toLocaleString()}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
