'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,        
  UserCircle,          
  LogIn,               
  UserPlus,            
  Search,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const router = useRouter();
  const { items, toggle } = useCart();
  const [term, setTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => setTerm((router.query.q as string) || ''), [router.query.q,router]);
  useEffect(() => {
    if (router.pathname !== '/') return;

    const id = setTimeout(() => {
      router.replace(
        { pathname: '/', query: { ...router.query, q: term || undefined } },
        undefined,
        { shallow: true, scroll: false }
      );
    }, 300);
    return () => clearTimeout(id);
  }, [term,router ]);

  useEffect(() => {
    const h = (e: MouseEvent) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);


  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 backdrop-opacity-100 bg-gray-100/80 shadow-sm backdrop-saturate-150">

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">Your Next Store</Link>
          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href={{ pathname: '/', query: { cat: 'apparel' } }} scroll={false}>Apparel</Link>
            <Link href={{ pathname: '/', query: { cat: 'accessories' } }} scroll={false}>Accessories</Link>
            <Link href={{ pathname: '/', query: { cat: 'digital' } }} scroll={false}>Digital</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
        
          <div className="relative hidden md:block">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search for products…"
              className="w-64 rounded border px-4 py-2 pr-10 outline-none focus:ring"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

        
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="rounded-full p-2 hover:bg-gray-100">
              <UserCircle size={21} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
               
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b">Account</div>
                {loggedIn ? (
                  <>
                    <button
                      onClick={() => { setLoggedIn(false); setOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <LogIn size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setLoggedIn(true); setOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <LogIn size={16} /> Sign In
                    </button>
                    <button
                      onClick={() => {  setOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <UserPlus size={16} /> Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* cart */}
          <button onClick={toggle} className="relative rounded-full p-2 hover:bg-gray-100">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
