"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionContextProvider';

const Navbar = () => {
  const { session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-blue-600 leading-none group-hover:text-blue-700 transition-colors">CULTURA</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Portal de Editais de Extremoz</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Início</Link>
          <Link to="/editais" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Editais</Link>
          <Link to="/inscricoes" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Inscrições</Link>
          <Link to="/biblioteca" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Biblioteca</Link>
        </div>

        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-gray-500 hidden lg:block">{session.user.email}</span>
            <Button 
              variant="ghost" 
              className="text-xs font-bold uppercase tracking-wider text-gray-500"
              onClick={() => import('@/integrations/supabase/client').then(m => m.supabase.auth.signOut())}
            >
              Sair
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-semibold uppercase text-[11px] tracking-wider shadow-sm">
              Entrar
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;