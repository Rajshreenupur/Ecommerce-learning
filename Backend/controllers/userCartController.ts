import { Request, Response } from "express";
import mongoose from 'mongoose'; 
import UserCart from "../models/userCartModel";
import ProductCategory from "../models/productModel";



//add to cart
export const AddUserCart = async (req: any, res: Response): Promise<void> => {
  const { productId, quantity } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const product = await ProductCategory.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    let userCart = await UserCart.findOne({ userId });

    if (userCart) {
      const existingProduct = userCart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        userCart.products.push({ productId, quantity });
      }

      await userCart.save();
      res.json(userCart);
    } else {
      const newCart = new UserCart({
        userId,
        products: [{ productId, quantity }],
      });

      await newCart.save();
      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while adding the cart item.", error: error });
  }
};


//get all cart item
export const GetAllCartItem = async (req: any, res: Response): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const userCart = await UserCart.findOne({ userId }).populate("products.productId");

    if (!userCart || userCart.products.length === 0) {
      res.status(404).json({ message: "No cart items found for this user" });
      return;
    }

    res.status(200).json(userCart.products);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving cart items.", error: error });
  }
};


//delete cart item
export const deleteCartItem = async (req: any, res: any): Promise<void> => {
  const userId = req.user?._id;
  const productId = req.params.id; 
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const userCart = await UserCart.findOne({ userId });

    if (!userCart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    

    const productIndex = userCart.products.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    if (productIndex === -1) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }

    userCart.products.splice(productIndex, 1);

    await userCart.save();

    res.status(200).json({ message: "Cart item deleted successfully", cart: userCart });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "An error occurred while deleting the cart item.", error: error });
  }
};


// Clear all cart items
export const clearCart = async (req: any, res: Response): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const userCart = await UserCart.findOne({ userId });

    if (!userCart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    userCart.products = [];

    await userCart.save();

    res.status(200).json({ message: "All cart items have been removed", cart: userCart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "An error occurred while clearing the cart.", error: error });
  }
};


