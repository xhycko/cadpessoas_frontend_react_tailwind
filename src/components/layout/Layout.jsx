import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <Header />
      
      {/* Main content com padding otimizado para mobile */}
      <main className="flex-1 pt-16 pb-4 px-4 sm:px-6 lg:px-8">
        {/* Container responsivo com breakpoints otimizados */}
        <div className="container-app animate-fade-in">
          <div className="w-full max-w-none sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
