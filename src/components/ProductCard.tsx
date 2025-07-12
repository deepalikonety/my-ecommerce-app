'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-xl bg-gray-100/80 shadow transition-shadow duration-300 hover:shadow-lg">
     
      <div className="group relative aspect-[8/10] flex items-center justify-center bg-white overflow-hidden rounded-xl">
        <Link href={`/product/${product.id}`}>
           <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain py-0.5 h-78 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-75"
          />
        </Link>

        <div
          className="
            absolute inset-0 top-103  pb-0 flex items-center justify-center
            bg-white translate-y-full group-hover:translate-y-0
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <button
            onClick={() => add(product)}
            className="px-5 py-3 bg-gray-200 text-black rounded-full shadow  font-semibold hover:bg-gray-300 transition"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* ── Title + Price ── */}
      <div className="px-3 pt-4 pb-4 text-left">
        <h3 className="text-gray-700 font-bold text-l line-clamp-2">{product.title}</h3>
        <p className="text-m font-semibold text-gray-500">${product.price}</p>
      </div>
    </div>
  );
} 