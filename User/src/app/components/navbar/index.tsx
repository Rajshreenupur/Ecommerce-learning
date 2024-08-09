"use client"
import React from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {

const handleLogout =()=>{
  localStorage.clear()
  router.push('/signin');
}
  const router=useRouter()
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-blue-500">
          <Link href="/">MyEcommerce</Link>
        </div>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/menswear" className="text-gray-700 hover:text-blue-500">
                Men’s Wear
              </Link>
            </li>
            <li>
              <Link href="/womenswear" className="text-gray-700 hover:text-blue-500">
                Women’s Wear
              </Link>
            </li>
            <li>
              <Link href="/kidswear" className="text-gray-700 hover:text-blue-500">
                Kids’ Wear
              </Link>
            </li>
          </ul>

          <Link href="/cart" className="text-gray-700 hover:text-blue-500 relative">
            <FaShoppingCart size={24} />
          </Link>
        </div>

        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            <FaSignOutAlt size={24} />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
