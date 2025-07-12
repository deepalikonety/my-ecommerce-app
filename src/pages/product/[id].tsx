
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

interface PixoEditorOutput {
  toDataURL(): string;
}
interface PixoBridge {
  edit(src: string): void;
}
interface PixoConstructor {
  new (opts: unknown): PixoBridge;
}
declare global {
  interface Window {
    Pixo?: { Bridge: PixoConstructor };
  }
}


export default function ProductDetailPage() {
  const router = useRouter();
  const rawId = router.query.id;
  const productId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [product, setProduct] = useState<Product | null>(null);
  const [others, setOthers] = useState<Product[]>([]);
  const { add } = useCart();

  const [editorReady, setEditorReady] = useState(false);
  const scriptAdded = useRef(false);
  const [reviews, setReviews] = useState<{ name: string; content: string }[]>([]);
const [reviewName, setReviewName] = useState('');
const [reviewText, setReviewText] = useState('');
const submitReview = () => {
  if (!reviewText.trim()) return;
  setReviews([...reviews, { name: reviewName || 'Anonymous', content: reviewText }]);
  setReviewName('');
  setReviewText('');
};


  useEffect(() => {
    if (!productId) return;

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((r) => r.json())
      .then((data) =>
        setProduct({
          id: data.id,
          title: data.title,
          price: Number(data.price),
          description: data.description,
          image: data.image,
          category: data.category,
        })
      )
      .catch(() => console.error('❌ Failed to fetch main product'));

    fetch('https://fakestoreapi.com/products')
      .then((r) => r.json())
      .then((data: Product[]) =>
        setOthers(data.filter((p) => p.id.toString() !== productId))
      )
      .catch(() => console.error('❌ Failed to fetch other products'));
  }, [productId]);

  useEffect(() => {
    if (scriptAdded.current) return;
    const s = document.createElement('script');
    s.src = 'https://pixoeditor.com/editor/scripts/bridge.m.js';
    s.async = true;
    s.onload = () => setEditorReady(true);
    document.body.appendChild(s);
    scriptAdded.current = true;
  }, []);

  const openEditor = () => {
    if (!editorReady || !window.Pixo || !product) return alert('Editor not ready');
    const editor = new window.Pixo.Bridge({
      apikey: 'hp9tiibnpxs0',
      type: 'modal',
      onSave(output: PixoEditorOutput) {
        setProduct((prev) => (prev ? { ...prev, image: output.toDataURL() } : prev));

        const link = document.createElement('a');
        link.href = output.toDataURL();
        link.download = 'edited-image.png';
        link.click();
      },
    });
    editor.edit(product.image);
    const z = document.createElement('style');
    z.textContent = '.pixo-modal{z-index:99999!important}';
    document.head.appendChild(z);
  };

  if (!product) return <div className="p-12 text-center">Loading…</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-4/5">
          <div className="rounded-l bg-white shadow-xl p-25">
            <Image
              src={product.image}
              alt={product.title}
              width={480}
              height={480}
              className="mx-auto  object-contain bg-white"
              priority
            />
            <button
              onClick={openEditor}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              ✏️ Edit Image
            </button>
          </div>
        </div>

        <div className="md:w-3/5 space-y-6 md:sticky md:top-32">
          <h1 className="text-[28px] md:text-[34px] font-semibold leading-snug text-black">
            {product.title}
          </h1>
          <p className="text-[22px] font-medium text-gray-900">${product.price}</p>
          <p className="text-[15px] md:text-base text-justify text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <button
            onClick={() => add(product)}
            className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Add to cart
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {others.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <div className="mt-16">
  <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>

  {reviews.length === 0 ? (
    <div className="text-gray-500">⭐ — No reviews yet.</div>
  ) : (
    <ul className="space-y-4">
      {reviews.map((rev, i) => (
        <li key={i} className="border p-4 rounded bg-white">
          <p className="font-semibold text-gray-800">{rev.name}</p>
          <p className="text-gray-600">{rev.content}</p>
        </li>
      ))}
    </ul>
  )}

  <div className="mt-6 border-t pt-6">
    <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
    <input
      value={reviewName}
      onChange={(e) => setReviewName(e.target.value)}
      placeholder="Your name (optional)"
      className="mb-2 w-full border rounded px-4 py-2"
    />
    <textarea
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review..."
      rows={3}
      className="w-full border rounded px-4 py-2"
    />
    <button
      onClick={submitReview}
      className="mt-2 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      Submit Review
    </button>
  </div>
</div>

    </div>
  );
}
