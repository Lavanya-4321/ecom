import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await CartItem.find().populate('productId');
  const cart = items.map(item => ({
    _id: item._id,
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    qty: item.qty
  }));
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  res.json({ cart, total });
});

router.post('/', async (req, res) => {
  const { productId, qty } = req.body;
  let item = await CartItem.findOne({ productId });
  if (item) {
    item.qty += (qty || 1);
    await item.save();
  } else {
    item = await CartItem.create({ productId, qty: qty || 1 });
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
