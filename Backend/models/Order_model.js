import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number, required: true }
  }],
  status: { type: String, default: 'Pending' },
  totalAmount: Number,
  expectedDelivery: Date,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
