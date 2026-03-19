"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Logo and Info */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-tight text-white leading-none">CULTURA</span>
              <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-[0.2em]">Portal de Editais de Extremoz</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Portal Cultural de Extremoz<br />
              Fomentando a arte e a cultura local com transparência e inovação.
            </p>
            <div className="space-y-4 text-sm text-slate-400 font-medium">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Rua Capitão José da Penha, Centro - Extremoz - RN, 59575-000</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <span>gabinetecivilextremoz@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <span>(84) 3279-4910</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={18} className="text-blue-400 shrink-0" />
                <span>Seg a Sex, das 7h às 13h</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-tight">Navegação</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Início</Link></li>
              <li><Link to="/editais" className="hover:text-blue-400 transition-colors">Editais</Link></li>
              <li><Link to="/inscricoes" className="hover:text-blue-400 transition-colors">Inscrições</Link></li>
              <li><Link to="/biblioteca" className="hover:text-blue-400 transition-colors">Biblioteca</Link></li>
              <li><button className="hover:text-blue-400 transition-colors">Login</button></li>
            </ul>
          </div>

          {/* Social and Realization */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-tight">Siga-nos</h4>
            <div className="flex gap-4 mb-10">
              <a href="#" className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1">
                <Instagram size={22} />
              </a>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Realização</p>
                <p className="font-bold text-slate-200">Prefeitura de Extremoz</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Apoio</p>
                <p className="font-bold text-slate-200">Secretaria de Cultura</p>
              </div>
            </div>
          </div>

          {/* Extra Column */}
          <div className="hidden lg:block">
            <div className="bg-blue-600/5 border border-blue-500/10 p-8 rounded-[2rem]">
              <p className="text-sm text-blue-200/80 italic leading-relaxed font-medium">
                "A cultura é o que nos define e nos une. Participe dos nossos editais e ajude a construir a história de Extremoz."
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 text-center text-[11px] text-slate-500 font-bold tracking-widest uppercase">
          <p>© 2026 - PREFEITURA DE EXTREMOZ. TODOS OS DIREITOS RESERVADOS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;