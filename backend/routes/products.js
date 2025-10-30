import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  let count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "Mobiles", price: 2999.00, image: "https://images.unsplash.com/photo-1580894894516-f9d8bd3b5079?auto=format&fit=crop&w=400&q=80", category: "Mobiles" },
      { name: "Laptops", price: 4999.00, image: "https://images.unsplash.com/photo-1556035239-356698f379f4?auto=format&fit=crop&w=400&q=80", category: "Laptops" },
      { name: "Books", price: 1999.00, image: "https://images.unsplash.com/photo-1508898578281-774ac4893a5f?auto=format&fit=crop&w=400&q=80", category: "Books" },
      { name: "Fashion", price: 999.00, image: "https://images.unsplash.com/photo-1592848541473-ecd03731280a?auto=format&fit=crop&w=400&q=80", category: "Fashion" },
      { name: "Beauty", price: 1499.00, image: "https://images.unsplash.com/photo-1502880195258-43a0b09ae9c0?auto=format&fit=crop&w=400&q=80", category: "Beauty" },
      { name: "Storage", price: 799.00, image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80", category: "Storage" }
    ]);
  }
  const products = await Product.find();
  res.json(products);
});

export default router;
