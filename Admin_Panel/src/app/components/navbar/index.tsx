"use client"
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar: FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear authentication tokens and redirect
    router.push('/signin');
  };

  return (
    <nav className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <Link href="/"
          className="text-2xl font-bold">YourLogo
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
