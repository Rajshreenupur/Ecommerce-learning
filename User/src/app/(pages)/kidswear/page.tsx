"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation";
import { AddCartItem } from "@/app/services/productsApi";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const KidsWear: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/products/getAllProduct"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const kidsProducts = data.filter(
          (product: Product) => product.category === "Kids"
        );

        setProducts(kidsProducts);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const router = useRouter();
  const addToCard = (productID:any)=>{
    AddCartItem(productID)
    router.push('/cart')

  }
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="bg-blue-500 py-20">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Kid's Wear</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product:any) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`http://localhost:5000${product.productUrl}`}
                alt={product.productName}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
                <p className="text-gray-700 mb-4">
                  This is a description of {product.productName}. It's a great product
                  with excellent features.
                </p>
                <p className="text-xl font-bold">{product.productPrice}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => {addToCard(product?._id)}}
                  >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
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

export default KidsWear;
