import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  paymentMethod: String,
  amount: Number,
  status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' },
  transactionDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
