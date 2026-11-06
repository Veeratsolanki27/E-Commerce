'use client'
import { productsDummyData, userDummyData, addressDummyData, orderDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY || '$';
    const router = useRouter();

    const [products, setProducts] = useState(productsDummyData);
    const [userData, setUserData] = useState(userDummyData);
    const [userAddresses, setUserAddresses] = useState(addressDummyData);
    const [orders, setOrders] = useState(orderDummyData);
    const [wishlist, setWishlist] = useState([]);

    // Seller Auth state (default false)
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    const [cartItems, setCartItems] = useState({});

    // Store Search and Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Promo Code state
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [appliedPromo, setAppliedPromo] = useState('');

    const sellerLogin = (username, password) => {
        if (username === 'admin' && password === 'admin') {
            setIsSellerLoggedIn(true);
            setIsSeller(true);
            toast.success("Logged in as Seller!");
            return true;
        } else {
            toast.error("Invalid username or password!");
            return false;
        }

    };

    const sellerLogout = () => {
        setIsSellerLoggedIn(false);
        setIsSeller(false);
        toast.success("Logged out from Seller Dashboard");
        router.push('/');
    };

    const fetchProductData = async () => {
        setProducts(productsDummyData);
    }

    const fetchUserData = async () => {
        setUserData(userDummyData);
    }

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart!");
    }

    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity <= 0) {
            delete cartData[itemId];
            toast.success("Item removed from cart");
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
    }

    const clearCart = () => {
        setCartItems({});
        setAppliedDiscount(0);
        setAppliedPromo('');
    }

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            setWishlist(wishlist.filter((id) => id !== productId));
            toast.success("Removed from wishlist");
        } else {
            setWishlist([...wishlist, productId]);
            toast.success("Added to wishlist!");
        }
    }

    const addAddress = (newAddress) => {
        const addressWithId = { ...newAddress, _id: Date.now().toString() };
        setUserAddresses((prev) => [addressWithId, ...prev]);
        toast.success("Shipping address saved!");
    }

    const addOrder = (newOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
        toast.success("Order placed successfully!");
    }

    const addProduct = (newProduct) => {
        setProducts((prev) => [newProduct, ...prev]);
        toast.success("Product added successfully!");
    }

    const deleteProduct = (productId) => {
        setProducts((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Product deleted successfully!");
    }

    const applyPromoCode = (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'DISCOUNT10') {
            setAppliedDiscount(0.10);
            setAppliedPromo('DISCOUNT10');
            toast.success("10% Promo Code Applied!");
            return true;
        } else if (cleanCode === 'QUICK20') {
            setAppliedDiscount(0.20);
            setAppliedPromo('QUICK20');
            toast.success("20% Promo Code Applied!");
            return true;
        } else {
            toast.error("Invalid Promo Code! Try 'DISCOUNT10' or 'QUICK20'");
            return false;
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const value = {
        currency, router,
        isSeller, setIsSeller,
        isSellerLoggedIn, sellerLogin, sellerLogout,
        userData, fetchUserData,
        products, setProducts, fetchProductData, addProduct, deleteProduct,
        userAddresses, setUserAddresses, addAddress,
        orders, setOrders, addOrder,
        cartItems, setCartItems, addToCart, updateCartQuantity, clearCart,
        getCartCount, getCartAmount,
        wishlist, toggleWishlist,
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        appliedDiscount, appliedPromo, applyPromoCode
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
