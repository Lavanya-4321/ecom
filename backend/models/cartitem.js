import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
  qty: { type: Number, default: 1 },
});

export default mongoose.model('CartItem', cartItemSchema);
