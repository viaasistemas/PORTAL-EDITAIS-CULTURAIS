"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Inscricoes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Minhas Inscrições</h1>
        <p className="text-gray-600">Acompanhe o status das suas inscrições utilizando seu protocolo.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Inscricoes;