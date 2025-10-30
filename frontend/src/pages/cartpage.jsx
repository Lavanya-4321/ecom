import Cart from "../components/cart";
import CheckoutForm from "../components/checkoutform";
import { useState } from "react";
import ReceiptModal from '../components/receiptmodal';

export default function CartPage() {
  const [receipt, setReceipt] = useState(null);
  return (
    <div>
      <h1>Your Cart</h1>
      <Cart />
      <CheckoutForm onReceipt={setReceipt} />
      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}
