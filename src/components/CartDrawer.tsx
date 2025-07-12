
'use client';

import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import Image from 'next/image';
export default function CartDrawer() {
  const { items, inc, dec, total, isOpen, toggle } = useCart();

  useEffect(() => {
    const body = document.body;
    const header = document.querySelector('header');

    if (isOpen) {
      body.style.overflow = 'hidden';
      if (header) header.style.display = 'none';
    } else {
      body.style.overflow = '';
      if (header) header.style.display = '';
    }

    return () => {
      body.style.overflow = '';
      if (header) header.style.display = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={toggle}
        className={`fixed inset-0 bg-black/40 transition-opacity z-30 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Cart Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full z-50 bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: '100%',
          maxWidth: '410px',
        }}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-[20px] font-bold text-black">Shopping Cart</h2>
          <button onClick={toggle}>
            <X size={22} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-6 last:border-none">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-white p-2 rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        height={240}
                        width={240}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-sm font-bold text-gray-900">${item.price}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-3">
                        <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-3 gap-4 text-sm font-medium">
                          <button
                            onClick={() => dec(item.id)}
                            className="text-gray-600 hover:text-black"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => inc(item.id)}
                            className="text-gray-600 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-5">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-gray-800">Total</span>
            <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Shipping and taxes will be added at the next step
          </p>
          <button className="w-full bg-black text-white text-sm font-semibold py-3 rounded-full hover:bg-gray-800 transition">
            Go to payment
          </button>
        </div>
      </aside>
    </>
  );
}
