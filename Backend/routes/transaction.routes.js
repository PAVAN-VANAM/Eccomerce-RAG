import express from 'express';
import {
  getAllTransactions,
  getUserTransactions,
  getTransactionById,
  createTransaction,
  filterTransactions,
  getDailyTransactionSummary
} from '../controllers/transaction.controller.js';

const router = express.Router();

// Create a new transaction (optional/manual)
router.post('/', createTransaction);

// Get all transactions
router.get('/', getAllTransactions);

// Get transactions by user ID
router.get('/user/:userId', getUserTransactions);

// Get transaction by ID
router.get('/:id', getTransactionById);

router.get('/filter', filterTransactions);

router.get('/summary/daily', getDailyTransactionSummary);


export default router;
