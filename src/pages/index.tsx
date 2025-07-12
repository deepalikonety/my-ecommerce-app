'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const FILTER_MAP: Record<string, string[]> = {
  apparel: ["men's clothing", "women's clothing"],
  accessories: ['jewelery'],
  digital: ['electronics'],
};

type FilterKey = keyof typeof FILTER_MAP;

export default function Home() {
  const { query } = useRouter();
  const cat = query.cat as FilterKey | undefined;
  const q = (query.q as string | undefined)?.toLowerCase() || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    let list = products;

    if (cat && FILTER_MAP[cat]) {
      const allowed = FILTER_MAP[cat];
      list = list.filter((p) => allowed.includes(p.category));
    }

    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    setFiltered(list);
  }, [products, cat, q]);

  return (
    <div className="px-4 md:px-8">
      <section className="mt-8 px-4 md:px-8">
  <div className="max-w-7xl mx-auto bg-white rounded-xl px-6 md:px-12 py-20 flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8">
    {/* Left: Text Block */}
    <div className="md:w-1/2 space-y-4 pt-2">
      <h4 className="text-[28px] md:text-[36px] font-bold leading-tight tracking-tight text-black">
        Discover our Curated Collection
      </h4>
      <p className="text-base md:text-lg text-gray-700">
        Explore our carefully selected products for your home and lifestyle.
      </p>
      <a
        href="#products"
        className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition"
      >
        Shop Now
      </a>
    </div>

    {/* Right: Mug Image */}
    <div className="md:w-1/2 flex justify-center mt-4 md:mt-10">
      <Image
        src="/mug.png"
        alt="Hero mug"
        width={300}
        height={300}
        className=" drop-shadow-lg"
        priority
      />
    </div>
  </div>
</section>



      <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-100/80 rounded-2xl" id="products">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-2">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
