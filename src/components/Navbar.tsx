"use client";

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Editais', path: '/editais' },
    { name: 'Inscrições', path: '/inscricoes' },
    { name: 'Biblioteca', path: '/biblioteca' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative">
        
        {/* Mobile Menu Trigger - Lado Esquerdo */}
        <div className="md:hidden flex items-center z-10">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#2b59c3] p-0">
                <Menu size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 border-r-none">
              <div className="flex flex-col h-full bg-white">
                <div className="p-6 border-b border-slate-50">
                  <span className="text-xl font-bold text-[#2b59c3]">Menu</span>
                </div>
                <div className="flex-grow py-8 px-6 space-y-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-bold ${location.pathname === link.path ? 'text-[#2b59c3]' : 'text-slate-900'}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - Centralizado no Mobile, Esquerda no Desktop */}
        <div className="flex items-center absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 md:order-first">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black tracking-tight text-[#2b59c3] leading-none text-center md:text-left">CULTURA</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center md:text-left">Portal de Editais de Extremoz</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Centralizado (Oculto no Mobile) */}
        <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-base font-bold transition-colors ${location.pathname === link.path ? 'text-[#2b59c3]' : 'text-slate-500 hover:text-[#2b59c3]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Espaço vazio para manter o alinhamento sem os botões de Auth */}
        <div className="hidden md:block w-20"></div>

      </div>
    </nav>
  );
};

export default Navbar;