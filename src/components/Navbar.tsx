"use client";

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionContextProvider';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { session, logoutFake } = useSession();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Editais', path: '/editais' },
    { name: 'Inscrições', path: '/inscricoes' },
    { name: 'Biblioteca', path: '/biblioteca' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 ${isHome ? 'bg-white' : 'bg-white/80 backdrop-blur-lg'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-blue-600 leading-none group-hover:text-blue-700 transition-colors">CULTURA</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Portal de Editais de Extremoz</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-[10px] font-bold">
                {session.user.email?.substring(0, 2).toUpperCase()}
              </div>
              <Button 
                variant="ghost" 
                className="text-xs font-bold uppercase tracking-wider text-gray-500"
                onClick={logoutFake}
              >
                Sair
              </Button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-semibold uppercase text-[11px] tracking-wider shadow-sm">
                Entrar
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-600">
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X size={24} />
                    </Button>
                  </div>
                  <div className="flex-grow py-8 px-6 space-y-6">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.path} 
                        to={link.path} 
                        onClick={() => setIsOpen(false)}
                        className={`block text-lg font-bold ${location.pathname === link.path ? 'text-blue-600' : 'text-gray-900'}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-100">
                    {session ? (
                      <Button 
                        className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl h-12"
                        onClick={() => {
                          logoutFake();
                          setIsOpen(false);
                        }}
                      >
                        Sair da Conta
                      </Button>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-12">
                          Entrar no Sistema
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;