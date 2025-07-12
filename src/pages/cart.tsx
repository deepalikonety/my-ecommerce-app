'use client';

import { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
export default function CartPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartProduct[];
    setCart(stored);
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem key={item.id} item={item} onUpdate={updateQuantity} />
          ))}

          {/* Total and Checkout */}
          <div className="border-t pt-6 mt-6 text-right">
            <div className="text-lg font-semibold mb-1">Total: ${total.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mb-4">
              Shipping and taxes will be added at the next step
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800">
              Go to payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
