import Transaction from '../models/transaction_model.js';

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('orderId userId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get transactions by user ID
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).populate('orderId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('orderId userId');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a manual transaction (optional utility)
export const createTransaction = async (req, res) => {
  const { userId, orderId, paymentMethod, amount, status } = req.body;

  try {
    const transaction = new Transaction({
      userId,
      orderId,
      paymentMethod,
      amount,
      status
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Filter transactions by date range and status
export const filterTransactions = async (req, res) => {
  const { startDate, endDate, status } = req.query;

  const filter = {};

  if (startDate && endDate) {
    filter.transactionDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  if (status) {
    filter.status = status;
  }

  try {
    const transactions = await Transaction.find(filter).populate('userId orderId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get daily totals for dashboard
export const getDailyTransactionSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" } },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

