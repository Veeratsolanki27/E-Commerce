'use client';
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MyOrders = () => {

    const { currency, orders, router } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <div className="flex items-center justify-between mt-6">
                        <h2 className="text-xl font-medium">My Orders ({orders.length})</h2>
                        <button onClick={() => router.push('/all-products')} className="text-xs text-orange-600 font-medium hover:underline">
                            + Continue Shopping
                        </button>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-16 text-gray-500 space-y-3">
                            <p className="text-lg">No orders placed yet.</p>
                            <button onClick={() => router.push('/all-products')} className="px-6 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="max-w-5xl border-t border-gray-300 text-sm">
                            {orders.map((order, index) => (
                                <div key={order._id || index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300 hover:bg-slate-50 transition rounded-lg my-2">
                                    <div className="flex-1 flex gap-5 max-w-md">
                                        <Image
                                            className="w-16 h-16 object-contain bg-gray-100 p-2 rounded"
                                            src={order.items[0]?.product?.image[0] || assets.box_icon}
                                            alt="product_icon"
                                            width={64}
                                            height={64}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="font-medium text-base text-gray-800">
                                                {order.items.map((item) => item.product ? (item.product.name + ` x ${item.quantity}`) : `Item x ${item.quantity}`).join(", ")}
                                            </p>
                                            <p className="text-xs text-gray-500">Items: {order.items.length}</p>
                                            <span className="inline-block w-fit text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
                                                Status: {order.status || 'Order Placed'}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">
                                            <span className="font-medium">{order.address?.fullName}</span>
                                            <br />
                                            <span>{order.address?.area}</span>
                                            <br />
                                            <span>{`${order.address?.city || ''}, ${order.address?.state || ''}`}</span>
                                            <br />
                                            <span className="text-xs text-gray-500">{order.address?.phoneNumber}</span>
                                        </p>
                                    </div>
                                    <p className="font-semibold text-orange-600 text-lg my-auto">{currency}{order.amount?.toFixed ? order.amount.toFixed(2) : order.amount}</p>
                                    <div>
                                        <p className="flex flex-col text-xs text-gray-600 gap-0.5">
                                            <span>Method: COD</span>
                                            <span suppressHydrationWarning>Date: {new Date(order.date).toLocaleDateString('en-US')}</span>
                                            <span className="text-green-600 font-medium">Payment: Pending (COD)</span>
                                        </p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;