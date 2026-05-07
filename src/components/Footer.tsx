"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          
          {/* Logo Section */}
          <div className="flex flex-col min-w-[200px]">
            <span className="text-3xl font-bold tracking-tight text-white leading-none">CULTURA</span>
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.1em] mt-1">Portal de Editais de Extremoz</span>
          </div>

          {/* Description Section */}
          <div className="max-w-[280px]">
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Portal Cultural de Extremoz<br />
              Fomentando a arte e a cultura local com transparência e inovação.
            </p>
          </div>

          {/* Address & Email Section */}
          <div className="space-y-3 min-w-[250px]">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-300 font-medium leading-tight">
                Rua Capitão José da Penha, Centro -<br />Extremoz - RN, 59575-000
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-blue-400 shrink-0" />
              <span className="text-[11px] text-slate-300 font-medium">gabinetecivilextremoz@gmail.com</span>
            </div>
          </div>

          {/* Phone & Hours Section */}
          <div className="space-y-3 min-w-[180px]">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-blue-400 shrink-0" />
              <span className="text-[11px] text-slate-300 font-medium">(84) 3279-4910</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-blue-400 shrink-0" />
              <span className="text-[11px] text-slate-300 font-medium">Seg a Sex, das 7h às 13h</span>
            </div>
          </div>

          {/* Realization Section */}
          <div className="min-w-[150px]">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Realização</p>
            <p className="text-sm font-bold text-slate-200">Prefeitura de Extremoz</p>
          </div>

          {/* Support Section */}
          <div className="min-w-[150px]">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Apoio</p>
            <p className="text-sm font-bold text-slate-200">Secretaria de Cultura</p>
          </div>

          {/* Social Section */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-200">Siga-nos</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                  <Instagram size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Credits */}
        <div className="flex justify-center mb-10">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
            Desenvolvido por: <span className="text-slate-200 font-bold ml-1">VIAA SISTEMAS</span>
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-900 text-center">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            © 2026 - PREFEITURA DE EXTREMOZ. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;