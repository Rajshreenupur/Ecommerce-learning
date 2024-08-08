import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar";

const categories = [
  {
    title: "Men’s Wear",
    href: "/menswear",
    src: "https://assets.vogue.com/photos/649ac5469a401f430c2a245c/master/w_2560%2Cc_limit/00-story%2520(1).jpg",
  },
  {
    title: "Women’s Wear",
    href: "/womenswear",
    src: "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/Womens-Clothing.jpg",
  },
  {
    title: "Kids’ Wear",
    href: "/kidswear",
    src: "https://st2.depositphotos.com/3591429/11644/i/450/depositphotos_116441598-stock-photo-kids-laughing-and-have-fun.jpg",
  },
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
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={category.src}
                    alt={category.title}
                    className="absolute inset-0 object-cover w-full h-full"
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
