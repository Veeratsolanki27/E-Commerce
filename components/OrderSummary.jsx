import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {

  const {
    currency, router, getCartCount, getCartAmount,
    userAddresses, addOrder, cartItems, products,
    appliedDiscount, appliedPromo, applyPromoCode
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  useEffect(() => {
    if (userAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(userAddresses[0]);
    }
  }, [userAddresses]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const handleApplyPromo = () => {
    if (!promoInput) {
      toast.error("Please enter a promo code");
      return;
    }
    applyPromoCode(promoInput);
  };

  const rawSubtotal = getCartAmount();
  const discountAmount = Math.floor(rawSubtotal * appliedDiscount * 100) / 100;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const taxAmount = Math.floor(subtotalAfterDiscount * 0.02 * 100) / 100;
  const totalAmount = Math.floor((subtotalAfterDiscount + taxAmount) * 100) / 100;

  const createOrder = async () => {
    if (getCartCount() === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    // Build order items array
    const items = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const product = products.find((p) => p._id === itemId);
        if (product) {
          items.push({
            product,
            quantity: cartItems[itemId]
          });
        }
      }
    }

    const newOrder = {
      _id: "ord_" + Date.now(),
      userId: "user_demo",
      items,
      amount: totalAmount,
      address: selectedAddress,
      status: "Order Placed",
      date: Date.now()
    };

    addOrder(newOrder);
    router.push('/order-placed');
  };

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5 rounded-lg border border-gray-200">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border bg-white rounded">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 text-gray-700 focus:outline-none flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate pr-2">
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-lg mt-1 z-20 py-1.5 rounded max-h-48 overflow-y-auto">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700"
                    onClick={() => handleAddressSelect(address)}
                  >
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-xs text-gray-500">{address.area}, {address.city}, {address.state}</p>
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-center text-orange-600 font-medium border-t"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="Try 'DISCOUNT10' or 'QUICK20'"
                className="flex-grow outline-none p-2.5 text-xs text-gray-700 border rounded uppercase"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button
                onClick={handleApplyPromo}
                className="bg-orange-600 text-white px-5 py-2 hover:bg-orange-700 transition rounded text-xs uppercase font-medium"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="text-xs text-green-600 font-medium">
                ✓ Code {appliedPromo} applied ({appliedDiscount * 100}% off)
              </p>
            )}
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between font-medium">
            <p className="uppercase text-gray-600">Items ({getCartCount()})</p>
            <p className="text-gray-800">{currency}{rawSubtotal.toFixed(2)}</p>
          </div>

          {appliedDiscount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <p>Promo Discount ({appliedDiscount * 100}%)</p>
              <p>-{currency}{discountAmount.toFixed(2)}</p>
            </div>
          )}

          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-green-600">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">{currency}{taxAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-semibold border-t pt-3 text-gray-900">
            <p>Total</p>
            <p className="text-orange-600">{currency}{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-orange-600 text-white font-medium py-3.5 mt-6 rounded hover:bg-orange-700 transition shadow-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;