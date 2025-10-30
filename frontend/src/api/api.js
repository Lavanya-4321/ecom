const BASE = 'http://localhost:5000/api';

export async function getProducts() {
  const res = await fetch(`${BASE}/products`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${BASE}/cart`);
  return res.json();
}

export async function addToCart(productId) {
  const res = await fetch(`${BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty: 1 })
  });
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${BASE}/cart/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function checkout(cartItems, name, email) {
  const res = await fetch(`${BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems, name, email })
  });
  return res.json();
}
