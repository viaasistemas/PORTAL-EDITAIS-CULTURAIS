"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';
import logoFooter from '@/assets/logo-footer.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] text-white pb-12 pt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Columns Grid - 2 colunas no mobile para melhor organização visual */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16 lg:pl-20 text-left">
          
          {/* ENDEREÇO */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Endereço</p>
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 font-medium leading-relaxed">
                Rua Lagoa, 2110, Centro -<br />Extremoz - RN - 59575-000
              </span>
            </div>
          </div>

          {/* HORÁRIO DE FUNCIONAMENTO */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Funcionamento</p>
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-blue-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Seg à Sex das 07h às 13h</span>
            </div>
          </div>

          {/* CONTATO */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contato</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">(84) 3279-4910</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium break-all">gabinetecivilextremoz@gmail.com</span>
              </div>
            </div>
          </div>

          {/* SIGA-NOS */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Siga-nos</p>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Youtube size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Logos Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 pt-8 border-t border-slate-900/50">
          <div className="max-w-[160px] h-[60px] flex items-center justify-center">
            <img 
              src={logoFooter} 
              alt="Cultura - Portal de Editais de Extremoz" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="max-w-[200px] h-[60px] flex items-center justify-center">
            <img 
              src={footerLogo} 
              alt="SECULT e Prefeitura de Extremoz" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-900/50 text-center">
          <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase px-4 leading-relaxed">
            © PREFEITURA MUNICIPAL DE EXTREMOZ - RN | DESENVOLVIDO POR VIAA SISTEMAS
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;