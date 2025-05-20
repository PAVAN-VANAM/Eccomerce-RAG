import express from 'express';

import { login, logout, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);


// GET /api/auth/session
router.get('/session', (req, res) => {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.json({ user: null });
    }
  });
  

export default router; 