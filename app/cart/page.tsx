"use client";

import { useCartStore } from "@/stores/cartStore";
import { Trash2 } from "lucide-react";

export default function Cart() {


    const {items, subtotal, removeFromCart, clearCart, updateQuantity,} = useCartStore((state) => state);

        
    if (items.length === 0 ) {
    return (
        <h2 className="text-center text-lg py-40 md:py-40 font-semibold">
            Your cart is empty 🛍️
        </h2>
        );
    }
    return  (
        <>
            <div className="px-6 pt-20 md:pt-20">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                    <p className="text-gray-600 mt-2">
                        Review your selected items before purchase. Enjoy a seamless shopping experience!
                    </p>
                </div>

                <div className="md:flex md:gap-8">
                    <div className="w-full md:w-7/10">
                        <div className="hidden md:grid grid-cols-2 font-semibold text-gray-700 border-b border-gray-400 pb-2 mb-4">
                            <span className="text-left">Product</span>
                            <span className="text-center">Price</span>
                        </div>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:grid md:grid-cols-2 items-start md:items-center gap-4 mb-4 border-b border-gray-200 pb-4"
                            >
                                {/* Product Column */}
                                <div className="flex gap-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium">{item.title}</h3>

                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        Math.max(1, item.quantity - 1)
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                −
                                            </button>

                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(
                                                        item.id,
                                                        Math.max(1, parseInt(e.target.value, 10) || 1)
                                                    )
                                                }
                                                className="w-12 text-center border rounded"
                                            />

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="hidden md:inline-flex items-center gap-1 text-red-500 hover:text-red-700 mt-2"
                                        >
                                            <Trash2 size={16} />
                                            <span className="text-sm">Remove</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Delete button on small screens */}
                                <div className="w-full flex justify-end md:hidden">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                {/* Price Column */}
                                <div className="text-gray-700 font-medium md:text-center">
                                    £{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                    </div>

                    <div className="md:w-3/10 w-full mt-8 md:mt-0 flex flex-col gap-6">
                        <div className="border border-gray-300 rounded-lg p-6 shadow-sm divide-y divide-gray-200">
                            <h2 className="text-xl font-semibold">Order Summary</h2>

                            <div className="py-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="font-medium">
                                        £{subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">
                                    Shipping and taxes calculated at checkout.
                                </p>
                            </div>

                            <div className="py-4">
                                <label
                                    htmlFor="orderNote"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Order Note
                                </label>
                                <textarea
                                    id="orderNote"
                                    rows={3}
                                    placeholder="Note order note..."
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="py-4">
                                <label
                                    htmlFor="coupon"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Add Coupon
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        id="coupon"
                                        type="text"
                                        placeholder="Coupon code"
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 text-sm">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="py-4 flex items-center gap-2 text-sm text-gray-700">
                                <input type="checkbox" id="terms" className="accent-grat-900" />
                                <label htmlFor="terms" className="select-none">
                                    I agree with{" "}
                                    <span className="underline cursor-pointer">
                                        Terms & Conditions
                                    </span>
                                </label>
                            </div>

                            <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-900 transition">
                                Proceed to Checkout
                            </button>
                        </div>

                        <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm space-y-4 text-sm text-gray-700">
                            <div>
                                <h3 className="font-semibold text-base mb-1">
                                    Delivery Information
                                </h3>
                                <p>
                                    Free returns within 15 days, please make sure the items
                                    are in undamaged condition.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-base mb-1">
                                    Up to 30-Day Guarantee
                                </h3>
                                <p>
                                    Bad luck with your tights? Simply contact us within 30
                                    days of receiving your order and we will replace them
                                    for free!
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-base mb-1">
                                    Payment Support
                                </h3>
                                <p>
                                    We support secure and flexible payment options for your
                                    convenience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};