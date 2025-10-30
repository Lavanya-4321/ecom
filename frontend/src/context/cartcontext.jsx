import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart } from '../api/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const refreshCart = async () => {
    const data = await getCart();
    setCart(data.cart);
    setTotal(data.total);
  };

  useEffect(() => { refreshCart(); }, []);

  const add = async (productId) => {
    await addToCart(productId);
    refreshCart();
  };

  const remove = async (id) => {
    await removeFromCart(id);
    refreshCart();
  };

  return (
    <CartContext.Provider value={{ cart, total, refreshCart, add, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
