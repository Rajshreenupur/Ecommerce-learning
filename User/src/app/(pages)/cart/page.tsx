"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/navbar";

// Sample cart data
const sampleCartItems = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: 20.00,
    quantity: 2,
    image: "https://via.placeholder.com/150?text=Men's+T-Shirt"
  },
  {
    id: 2,
    name: "Women's Dress",
    price: 40.00,
    quantity: 1,
    image: "https://via.placeholder.com/150?text=Women's+Dress"
  }
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle item removal
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
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
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center mb-6 border-b pb-4">
                  <div className="w-1/4">
                    <Image
                    //   src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-3/4 pl-4">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <label className="mr-2">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="border rounded p-1 w-16"
                      />
                    </div>
                    <p className="mt-2 font-bold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 mt-2 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold">Grand Total: ${calculateTotal()}</p>
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
