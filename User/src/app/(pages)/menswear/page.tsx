import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";

const products = [
  { id: 1, name: "Product 1", price: "$99.99", image: "https://via.placeholder.com/400x300?text=Product+1" },
  { id: 2, name: "Product 2", price: "$89.99", image: "https://via.placeholder.com/400x300?text=Product+2" },
  { id: 3, name: "Product 3", price: "$79.99", image: "https://via.placeholder.com/400x300?text=Product+3" },
  { id: 4, name: "Product 4", price: "$69.99", image: "https://via.placeholder.com/400x300?text=Product+4" },
  { id: 5, name: "Product 5", price: "$59.99", image: "https://via.placeholder.com/400x300?text=Product+5" },
  { id: 6, name: "Product 6", price: "$49.99", image: "https://via.placeholder.com/400x300?text=Product+6" },
  { id: 7, name: "Product 7", price: "$39.99", image: "https://via.placeholder.com/400x300?text=Product+7" },
  { id: 8, name: "Product 8", price: "$29.99", image: "https://via.placeholder.com/400x300?text=Product+8" },
  { id: 9, name: "Product 9", price: "$19.99", image: "https://via.placeholder.com/400x300?text=Product+9" },
  { id: 10, name: "Product 10", price: "$9.99", image: "https://via.placeholder.com/400x300?text=Product+10" },
];

const MensWear: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar/>
      <header className="bg-blue-500 py-20">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Men's Wear</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                // src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">This is a description of {product.name}. It's a great product with excellent features.</p>
                <p className="text-xl font-bold">{product.price}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add to Cart</button>
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

export default MensWear;
