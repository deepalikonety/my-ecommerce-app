// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import '../styles/vendor.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
  <Header />
  <Component {...pageProps} />
  <CartDrawer />   
</CartProvider>

  );
}
