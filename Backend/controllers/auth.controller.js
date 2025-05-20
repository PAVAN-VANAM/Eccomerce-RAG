
import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import { generateToken, setSessionCookie, clearSessionCookie } from '../utils/session.utils.js';

export const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  
      // Generate token and set cookie
      const token = generateToken(user._id);
      setSessionCookie(res, token);
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }

export const login =  async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate token and set cookie
      const token = generateToken(user._id);
      setSessionCookie(res, token);
  
      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }

export const logout = (req, res) => {
    clearSessionCookie(res);
    res.json({ message: 'Logged out successfully' });
  }