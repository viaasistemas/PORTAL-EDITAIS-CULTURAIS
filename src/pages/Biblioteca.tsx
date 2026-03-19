"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Biblioteca = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Biblioteca Digital</h1>
        <p className="text-gray-600">Documentos, leis e materiais de apoio para artistas e produtores.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Biblioteca;