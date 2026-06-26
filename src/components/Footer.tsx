"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo Section - order-1 no mobile */}
          <div className="flex flex-col order-1">
            <span className="text-3xl font-black tracking-tight text-white leading-none">CULTURA</span>
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] mt-1">Portal de Editais de Extremoz</span>
          </div>

          {/* Social Section - order-2 no mobile, order-4 no desktop */}
          <div className="space-y-6 order-2 lg:order-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Siga-nos</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Endereço Section - order-3 no mobile, order-2 no desktop */}
          <div className="space-y-6 order-3 lg:order-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Endereço</p>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 font-medium leading-relaxed">
                Rua Lagoa, 2110, Centro -<br />Extremoz - RN - 59575-000
              </span>
            </div>
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contato</p>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">(84) 3279-4910</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">gabinetecivilextremoz@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Horário Section - order-4 no mobile, order-3 no desktop */}
          <div className="space-y-6 order-4 lg:order-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Horário de Funcionamento</p>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-blue-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Seg à Sex das 07h às 13h</span>
            </div>
            <div className="space-y-4 pt-4">
              {/* Imagem oficial da prefeitura e secretaria */}
              <div className="w-full max-w-[240px] rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center">
                <img 
                  src={footerLogo} 
                  alt="SECULT e Prefeitura de Extremoz" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-slate-900 text-center">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            © PREFEITURA MUNICIPAL DE EXTREMOZ - RN | DESENVOLVIDO POR VIAA SISTEMAS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;