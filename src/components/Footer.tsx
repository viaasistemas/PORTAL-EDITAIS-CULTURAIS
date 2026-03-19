"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Info */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter text-white leading-none">CULTURA</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Portal de Editais de Extremoz</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Portal Cultural de Extremoz<br />
              Fomentando a arte e a cultura local.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Rua Capitão José da Penha, Centro - Extremoz - RN, 59575-000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <span>gabinetecivilextremoz@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <span>(84) 3279-4910</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-blue-400 shrink-0" />
                <span>Seg a Sex, das 7h às 13h</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Início</Link></li>
              <li><Link to="/editais" className="hover:text-blue-400 transition-colors">Editais</Link></li>
              <li><Link to="/inscricoes" className="hover:text-blue-400 transition-colors">Inscrições</Link></li>
              <li><Link to="/biblioteca" className="hover:text-blue-400 transition-colors">Biblioteca</Link></li>
              <li><button className="hover:text-blue-400 transition-colors">Login</button></li>
            </ul>
          </div>

          {/* Social and Realization */}
          <div>
            <h4 className="text-lg font-bold mb-6">Siga-nos</h4>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Realização</p>
                <p className="font-bold">Prefeitura de Extremoz</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Apoio</p>
                <p className="font-bold">Secretaria de Cultura</p>
              </div>
            </div>
          </div>

          {/* Extra Column for spacing or more info */}
          <div className="hidden lg:block">
            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-xl">
              <p className="text-sm text-blue-200 italic">
                "A cultura é o que nos define e nos une. Participe dos nossos editais e ajude a construir a história de Extremoz."
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© 2026 - PREFEITURA DE EXTREMOZ. TODOS OS DIREITOS RESERVADOS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;