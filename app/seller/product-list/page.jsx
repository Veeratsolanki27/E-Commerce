'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";

const ProductList = () => {

  const { products, deleteProduct, currency, router } = useAppContext();

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-medium">All Products ({products.length})</h2>
          <button onClick={() => router.push('/seller')} className="px-4 py-2 text-xs bg-orange-600 text-white font-medium rounded hover:bg-orange-700 transition">
            + Add New Product
          </button>
        </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 shadow-sm">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left bg-gray-50 border-b">
              <tr>
                <th className="w-2/5 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate">Price</th>
                <th className="px-4 py-3 font-medium truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20 hover:bg-gray-50 transition">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2 flex-shrink-0">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-12 h-12 object-cover rounded"
                        width={48}
                        height={48}
                      />
                    </div>
                    <span className="truncate w-full font-medium text-gray-800">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{currency}{product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition">
                        <span>Visit</span>
                        <Image
                          className="h-3"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                      <button onClick={() => deleteProduct(product._id)} className="px-2.5 py-1.5 bg-red-100 text-red-600 rounded text-xs font-medium hover:bg-red-200 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;