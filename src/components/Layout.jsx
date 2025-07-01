import React from 'react';

const Layout = ({ children }) => {
  return (
    <main className="pt-[80px] px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto">
      {children}
    </main>
  );
};

export default Layout;
