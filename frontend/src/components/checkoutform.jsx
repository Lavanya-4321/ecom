import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { checkout } from '../api/api';

export default function CheckoutForm({ onReceipt }) {
  const { cart, refreshCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setProcessing(true);
    const resp = await checkout(cart, name, email);
    onReceipt(resp.receipt);
    await refreshCart();
    setProcessing(false);
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input required placeholder="Email" value={email} type="email" onChange={e => setEmail(e.target.value)} />
      <button type="submit" disabled={processing || !cart.length}>Checkout</button>
    </form>
  );
}
