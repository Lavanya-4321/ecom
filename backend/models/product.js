import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,  // URL of product image
  category: String // New field for category
});

export default mongoose.model('Product', productSchema);
