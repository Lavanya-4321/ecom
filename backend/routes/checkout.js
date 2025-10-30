import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { cartItems, name, email } = req.body;
  // Mock checkout: calculate total, return "receipt"
  const productObjs = await Promise.all(
    cartItems.map(async item => {
      const product = await Product.findById(item.productId);
      return {
        name: product.name,
        qty: item.qty,
        price: product.price,
        subtotal: product.price * item.qty
      };
    })
  );
  const total = productObjs.reduce((sum, i) => sum + i.subtotal, 0);
  // Empty cart
  await CartItem.deleteMany({});
  res.json({
    receipt: {
      items: productObjs,
      total,
      timestamp: new Date(),
      user: { name, email }
    }
  });
});

export default router;
