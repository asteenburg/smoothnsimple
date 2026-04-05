"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='flex flex-col min-h-screen bg-black text-white'>
      <Header />
      <main className='max-w-5xl mx-auto px-6 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-pink-500'>Your Cart</h1>

        {cart.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link
              href='/shop'
              className='text-pink-500 underline'
            >
              Go shopping
            </Link>
          </p>
        ) : (
          <>
            <div className='space-y-4 mb-6'>
              {cart.map((item, idx) => (
                <div
                  key={item.id + "-" + idx}
                  className='flex justify-between bg-zinc-900 p-4 rounded-xl'
                >
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                  <button
                    className='text-red-500 text-xs'
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className='flex justify-between text-xl font-bold mb-6'>
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <div className='flex gap-4'>
              <Link
                href='/checkout'
                className='bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded-lg font-bold'
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className='bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-lg font-bold'
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
