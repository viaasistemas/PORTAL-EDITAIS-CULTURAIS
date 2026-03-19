"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <nav className={cn(
        "container max-w-6xl h-16 px-6 flex items-center justify-between transition-all duration-500 pointer-events-auto rounded-2xl",
        scrolled ? "glass translate-y-0" : "bg-transparent translate-y-2"
      )}>
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-black text-xl">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">CULTURA</span>
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em]">Extremoz</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {['Início', 'Editais', 'Inscrições', 'Biblioteca'].map((item) => (
            <Link 
              key={item}
              to={item === 'Início' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        <Button className="bg-slate-900 hover:bg-blue-600 text-white px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-slate-200">
          Acessar
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;