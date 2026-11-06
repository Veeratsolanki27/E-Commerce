"use client"
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const categoriesList = ["Earphone", "Headphone", "Watch", "Smartphone", "Laptop", "Camera", "Accessories"];

const Navbar = () => {

  const { isSellerLoggedIn, router, getCartCount, searchQuery, setSearchQuery, setSelectedCategory, wishlist } = useAppContext();
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push('/all-products');
    }
  };

  const handleShopClick = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    router.push('/all-products');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setShowCategoriesMenu(false);
    router.push('/all-products');
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative bg-white">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <button
          suppressHydrationWarning
          onClick={handleShopClick}
          className="hover:text-gray-900 transition text-gray-700 font-normal"
        >
          Shop
        </button>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            suppressHydrationWarning
            onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
            onMouseEnter={() => setShowCategoriesMenu(true)}
            className="hover:text-gray-900 transition flex items-center gap-1 text-gray-700 py-1"
          >
            Categories
            <svg className={`w-3.5 h-3.5 transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCategoriesMenu && (
            <div
              onMouseLeave={() => setShowCategoriesMenu(false)}
              className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 text-sm"
            >
              <button
                suppressHydrationWarning
                onClick={() => handleCategorySelect("All")}
                className="w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600 font-medium text-gray-700 border-b"
              >
                🛍️ All Categories
              </button>
              {categoriesList.map((cat) => (
                <button
                  suppressHydrationWarning
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="w-full text-left px-4 py-1.5 hover:bg-orange-50 hover:text-orange-600 text-gray-700 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link href="/about-us" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact-us" className="hover:text-gray-900 transition">
          Contact Us
        </Link>


        <button
          suppressHydrationWarning
          onClick={() => router.push('/seller')}
          className="text-xs border border-orange-500 text-orange-600 px-4 py-1.5 rounded-full hover:bg-orange-50 transition font-medium"
        >
          {isSellerLoggedIn ? 'Seller Dashboard' : 'Seller Login'}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input / Icon */}
        <div className="relative">
          {showSearch ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center border rounded-full px-3 py-1 bg-gray-50">
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-xs w-36 md:w-48 text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button suppressHydrationWarning type="submit">
                <Image className="w-3.5 h-3.5" src={assets.search_icon} alt="search" />
              </button>
            </form>
          ) : (
            <button
              suppressHydrationWarning
              onClick={() => setShowSearch(true)}
              className="p-1 hover:bg-gray-100 rounded-full transition"
            >
              <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
            </button>
          )}
        </div>

        {/* Wishlist Icon & Badge */}
        <button suppressHydrationWarning onClick={() => router.push('/wishlist')} className="relative flex items-center p-1 hover:bg-gray-100 rounded-full transition">
          <Image className="w-5 h-5" src={assets.heart_icon} alt="wishlist icon" />
          {wishlist && wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart Icon & Badge */}
        <button suppressHydrationWarning onClick={() => router.push('/cart')} className="relative flex items-center p-1 hover:bg-gray-100 rounded-full transition">
          <Image className="w-5 h-5" src={assets.cart_icon} alt="cart icon" />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          )}
        </button>

        {/* Account Button & Dropdown */}
        <div className="relative">
          <button
            suppressHydrationWarning
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-1.5 hover:text-gray-900 transition text-sm py-1 px-2 rounded-md hover:bg-gray-100"
          >
            <Image className="w-4 h-4" src={assets.user_icon} alt="user icon" />
            <span className="max-sm:hidden">Account</span>
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 text-sm">
              <button
                suppressHydrationWarning
                onClick={() => { router.push('/wishlist'); setShowAccountMenu(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
              >
                ❤️ My Wishlist ({wishlist ? wishlist.length : 0})
              </button>
              <button
                suppressHydrationWarning
                onClick={() => { router.push('/my-orders'); setShowAccountMenu(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
              >
                📦 My Orders
              </button>
              <button
                suppressHydrationWarning
                onClick={() => { router.push('/cart'); setShowAccountMenu(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
              >
                🛒 My Cart ({getCartCount()})
              </button>
              <button
                suppressHydrationWarning
                onClick={() => { router.push('/seller'); setShowAccountMenu(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-orange-600 font-medium flex items-center gap-2 border-t"
              >
                💼 {isSellerLoggedIn ? 'Seller Dashboard' : 'Seller Login'}
              </button>
            </div>
          )}
        </div>

      </div>

    </nav>
  );
};

export default Navbar;


