"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Editais = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Editais Abertos</h1>
        <p className="text-gray-600">Em breve, a lista completa de editais estará disponível aqui.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Editais;