import { Request, Response } from "express";
import UserCart from "../models/userCartModel";
import ProductCategory from "../models/productModel";

// Add a cart item
export const AddUserCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId, quantity } = req.body;

  try {
    const product = await ProductCategory.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const cartItem = await UserCart.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      const newCartItem = new UserCart({
        productId,
        quantity,
      });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Get all cart items
export const GetAllCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cartItems = await UserCart.find().populate("productId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete a cart item
export const DeleteCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cartItemId = req.params.id;

  try {
    const cartItem = await UserCart.findByIdAndDelete(cartItemId);
console.log(cartItem)
    if (!cartItem) {
      res.status(404).json({ message: "Cart item not found" });
      return;
    }

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
