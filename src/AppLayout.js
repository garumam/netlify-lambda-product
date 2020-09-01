import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './global/cartStore';

function AppLayout(props) {
  return (
    <>
      <CartProvider>
        <Header />
        <main>{props.children}</main>
      </CartProvider>
      <Footer />
    </>
  );
}

export default AppLayout;
