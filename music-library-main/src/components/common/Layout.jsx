import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto ">{children}</main>
    </div>
  );
}

export default Layout;