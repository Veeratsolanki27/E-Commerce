'use client';
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";

const Orders = () => {

    const { currency, orders } = useAppContext();

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Customer Orders ({orders.length})</h2>
                {orders.length === 0 ? (
                    <div className="text-gray-500 py-10">No customer orders placed yet.</div>
                ) : (
                    <div className="max-w-4xl rounded-md bg-white border border-gray-200 shadow-sm">
                        {orders.map((order, index) => (
                            <div key={order._id || index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-200 hover:bg-slate-50 transition">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="w-12 h-12 object-contain bg-gray-100 p-2 rounded"
                                        src={order.items[0]?.product?.image[0] || assets.box_icon}
                                        alt="box_icon"
                                        width={48}
                                        height={48}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-gray-800">
                                            {order.items.map((item) => (item.product ? item.product.name : 'Item') + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span className="text-xs text-gray-500">Items: {order.items.length}</span>
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
                                <p className="font-semibold text-orange-600 text-base my-auto">{currency}{order.amount?.toFixed ? order.amount.toFixed(2) : order.amount}</p>
                                <div>
                                    <p className="flex flex-col text-xs text-gray-600">
                                        <span>Method: COD</span>
                                        <span suppressHydrationWarning>Date: {new Date(order.date).toLocaleDateString('en-US')}</span>
                                        <span className="text-green-600 font-medium mt-1">Status: {order.status || 'Order Placed'}</span>
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Orders;