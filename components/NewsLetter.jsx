'use client'
import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing! Use promo code QUICK20 for 20% off!");
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-500 pb-6 max-w-lg">
        Subscribe to our newsletter to receive exclusive deals, new arrival updates, and special discount codes directly to your inbox.
      </p>

      {subscribed ? (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl max-w-md w-full text-sm font-medium shadow-sm transition">
          🎉 Thank you for subscribing! <br />
          Use promo code <span className="font-bold text-green-900 bg-green-200 px-2 py-0.5 rounded font-mono">QUICK20</span> at checkout for 20% off.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
          <input
            suppressHydrationWarning
            className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-4 text-sm text-gray-700 focus:border-orange-500 transition"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            suppressHydrationWarning
            type="submit"
            className="md:px-12 px-8 h-full text-white bg-orange-600 hover:bg-orange-700 transition font-medium rounded-md rounded-l-none text-sm shadow-md"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsLetter;

