import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, total, remove } = useCart();

  return (
    <div>
      {cart.length === 0 ? <div>Cart is empty.</div> : (
        <table>
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Remove</th></tr>
          </thead>
          <tbody>
            {cart.map(item =>
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{(item.price * item.qty).toFixed(2)}</td>
                <td><button onClick={() => remove(item._id)}>x</button></td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div>Total: <b>₹{total.toFixed(2)}</b></div>
    </div>
  );
}
