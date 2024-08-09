"use client";

import React, { useEffect, useState } from "react";
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
        setError("No data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total + parseFloat(item.productId.productPrice) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item._id !== id)
      );
    } catch (err) {
      setError("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotal();
    const amountInPaise = Math.round(parseFloat(totalAmount) * 100); // Convert to paise

    try {
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const { orderId } = await response.json();

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_QpKqKFb6YLwb26",
          amount: amountInPaise, // Convert to paise
          currency: "INR",
          name: "MyEcommerce",
          description: "Purchase Description",
          image: "https://your-logo-url.com",
          order_id: orderId, 
          handler: function (response: any) {
            console.log("Payment Successful: ", response);
            fetch("http://localhost:5000/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: totalAmount,
                currency: "INR",
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message === "Payment verified and saved successfully") {
                  alert("Payment verified and saved successfully!");
                } else {
                  alert("Payment verification failed!");
                }
              })
              .catch(() => {
                alert("Failed to verify payment");
              });
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9546606800",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };

      script.onerror = () => {
        console.error("Razorpay SDK failed to load. Are you online?");
        alert("Failed to load Razorpay SDK. Please try again later.");
      };
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Failed to create order. Please try again later.");
    }
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
                      Price: ₹{parseFloat(item.productId.productPrice).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <label className="mr-2">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, parseInt(e.target.value))
                        }
                        className="border rounded p-1 w-16"
                      />
                    </div>
                    <p className="mt-2 font-bold">
                      Total: ₹{(parseFloat(item.productId.productPrice) * item.quantity).toFixed(2)}
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
                Grand Total: ₹{calculateTotal()}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
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
