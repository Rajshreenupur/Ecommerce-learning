import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar";

const categories = [
  { title: "Men’s Wear", href: "/menswear", src: "https://via.placeholder.com/400x300?text=Men's+Wear" },
  { title: "Women’s Wear", href: "/womenswear", src: "https://via.placeholder.com/400x300?text=Women's+Wear" },
  { title: "Kids’ Wear", href: "/kidswear", src: "https://via.placeholder.com/400x300?text=Kids'+Wear" }
];

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="bg-blue-500 py-20">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to MyEcommerce</h1>
          <p className="text-xl">Find the best products at the best prices!</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Categories</h2>
        <div className="vertical-slider-container">
          {categories.map((category, index) => (
            <div key={index} className="vertical-slider-item">
              <Link href={category.href}>
                <div className="relative w-full h-64">
                  <Image
                    // src={category.src}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="vertical-slider-content">
                <h3 className="text-xl font-bold">{category.title}</h3>
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

export default Home;
