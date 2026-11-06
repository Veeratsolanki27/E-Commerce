'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React, { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Layout = ({ children }) => {
  const { isSellerLoggedIn, sellerLogin, router } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    sellerLogin(username, password);
  };

  if (!isSellerLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <Image
              onClick={() => router.push('/')}
              className="w-36 cursor-pointer mb-3"
              src={assets.logo}
              alt="QuickCart logo"
            />
            <h1 className="text-xl font-bold text-gray-800">Seller & Admin Portal</h1>
            <p className="text-xs text-gray-500 mt-1">Authorized access required to manage products & orders</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500 text-sm text-gray-800 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500 text-sm text-gray-800 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg text-sm transition shadow-md mt-2"
            >
              Access Seller Dashboard
            </button>
          </form>

          <button
            onClick={() => router.push('/')}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-800 mt-6 block transition"
          >
            ← Return to Customer Store
          </button>

        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout