import e from "express";
import {createRazorpayOrder} from "../controllers/razorpay.controller.js"

const router = e.Router();

router.post('/razorpay/create-order', createRazorpayOrder);
