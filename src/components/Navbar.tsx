"use client";

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionContextProvider';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { session, logoutFake } = useSession();
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
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo - Esquerda */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#2b59c3] leading-none">CULTURA</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Portal de Editais de Extremoz</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Centralizado */}
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

        {/* Auth - Direita (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Button 
              variant="ghost" 
              className="text-xs font-bold uppercase tracking-wider text-slate-500"
              onClick={logoutFake}
            >
              Sair
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-[#2b59c3] hover:bg-[#1e44a3] text-white px-8 h-11 rounded-xl font-bold uppercase text-[11px] tracking-wider shadow-md shadow-blue-100">
                ENTRAR
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger - Garantindo que fique à direita */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#2b59c3] p-0">
                <Menu size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 border-l-none">
              <div className="flex flex-col h-full bg-white">
                <div className="p-6 border-b border-slate-50">
                  <span className="text-xl font-bold text-[#2b59c3]">Menu</span>
                  {/* Botão X removido conforme solicitado */}
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
                <div className="p-6 border-t border-slate-50">
                  {!session ? (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold rounded-xl h-12">
                        ENTRAR
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={logoutFake} variant="outline" className="w-full h-12 rounded-xl font-bold text-slate-500">
                      SAIR
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;