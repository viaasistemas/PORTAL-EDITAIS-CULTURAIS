"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-blue-600 leading-none">CULTURA</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Portal de Editais de Extremoz</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Início</Link>
          <Link to="/editais" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Editais</Link>
          <Link to="/inscricoes" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Inscrições</Link>
          <Link to="/biblioteca" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Biblioteca</Link>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-md font-bold uppercase text-xs tracking-wider">
          Entrar
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;