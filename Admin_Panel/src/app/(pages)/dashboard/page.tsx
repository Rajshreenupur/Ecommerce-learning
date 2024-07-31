"use client";
import Navbar from "@/app/components/navbar";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-lg font-bold">Dashboard</div>
          <ul className="mt-4">
            <li className={"p-4 cursor-pointer bg-gray-700"}>
              Add New Product
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Product Dashboard</h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Product name"
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Product price"
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Product image URL"
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <select className="p-2 border border-gray-300 rounded mr-2">
              <option value="men">Mens</option>
              <option value="women">Womens</option>
              <option value="kid">Kids</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Product
            </button>
          </div>

          <ul className="space-y-4">
            {/* Sample Product Item */}
            <li className="flex items-center space-x-4 p-4 bg-white rounded shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Sample Product"
                className="w-32 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold">Sample Product</div>
                <div className="text-gray-600">$99.99</div>
                <div className="text-gray-600">Category</div>
              </div>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </li>
            {/* End of Sample Product Item */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
