import Order from '../models/Order_model.js';
import Product from '../models/Product_model.js';
import Transaction from '../models/transaction_model.js';

export const placeOrder = async (req, res) => {
  const { userId, products, paymentMethod } = req.body;

  try {
    let total = 0;
    for (let item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.qty) {
        return res.status(400).json({ message: 'Product out of stock or not found' });
      }
      total += product.price * item.qty;
    }

    const order = new Order({
      userId,
      products,
      totalAmount: total,
      status: 'Placed',
      expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // +5 days
    });

    await order.save();

    // Save Transaction
    const transaction = new Transaction({
      userId,
      orderId: order._id,
      paymentMethod,
      amount: total,
      status: 'Success'
    });
    await transaction.save();

    // Decrease stock
    for (let item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.qty }
      });
    }

    res.status(201).json({ order, transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
