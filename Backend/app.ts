import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoute";
import userRoutes from "./routes/userRoute";
import productRoutes from "./routes/productRoute";
import path from "path";
import Razorpay from "razorpay";
import Payment from "./models/paymentModel";
import cors from "cors";
import crypto from "crypto"; 
import Stripe from "stripe";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.get("/items", (req: Request, res: Response) => {
  res.json({ message: "Get all items" });
});


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});
app.post("/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Your Product Name",
            },
            unit_amount: amount, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success", 
      cancel_url: "http://localhost:3000/cancel", 
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
});



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});


app.post("/create-order", async (req: Request, res: Response) => {
  try {
    const { amount } = req.body; // Amount in paise

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
      payment_capture: true, // Change this to `true`
    });

    res.json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});


app.post("/verify-payment", async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    const newPayment = new Payment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "successful",
      amount: amount,
      currency: currency,
    });

    try {
      await newPayment.save();
      res.json({ message: "Payment verified and saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to save payment", error });
    }
  } else {
    res.status(400).json({ message: "Invalid payment signature" });
  }
});

export default app;
