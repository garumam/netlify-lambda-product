import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './global/cartStore';
import { NotificationProvider } from './global/notificationStore';

function AppLayout(props) {
  return (
    <>
      <NotificationProvider>
        <CartProvider>
          <Header />
          <main>{props.children}</main>
        </CartProvider>
      </NotificationProvider>
      <Footer />
    </>
  );
}

export default AppLayout;
