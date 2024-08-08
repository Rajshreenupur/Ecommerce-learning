"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { deleteCartItem, getAllProduct } from "@/app/services/productsApi";

interface Product {
  _id: string;
  productId: {
    _id: string;
    category: string;
    productName: string;
    productPrice: string;
    productUrl: string;
    sizesQuantities: any[];
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllProduct();
        setCartItems(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total + parseFloat(item.productId.productPrice) * item.quantity,
        0
      )
      .toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    deleteCartItem(id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-blue-500 py-20">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Items in your cart</h2>
          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-6 border-b pb-4"
                >
                  <div className="w-1/4">
                    <img
                      src={`http://localhost:5000${item.productId.productUrl}`}
                      alt={item.productId.productName}
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-3/4 pl-4">
                    <h3 className="text-xl font-bold">
                      {item.productId.productName}
                    </h3>
                    <p className="text-gray-700">
                      Price: $
                      {parseFloat(item.productId.productPrice).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <label className="mr-2">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        className="border rounded p-1 w-16"
                      />
                    </div>
                    <p className="mt-2 font-bold">
                      Total: $
                      {(
                        parseFloat(item.productId.productPrice) * item.quantity
                      ).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 mt-2 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && !loading && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold">
                Grand Total: ${calculateTotal()}
              </p>
              <Link
                href="/checkout"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MyEcommerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
