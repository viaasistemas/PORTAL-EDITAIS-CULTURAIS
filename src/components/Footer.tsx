"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import footerLogo from '@/assets/footer-logo.png';
import logoFooter from '@/assets/logo-footer.png';
import waveLeft from '@/assets/wave-left.png';
import waveRight from '@/assets/wave-right.png';

const Footer = () => {
  return (
    <div className="w-full">
      {/* Top Wave Transition Section */}
      <div className="relative w-full bg-white h-20 md:h-28 overflow-hidden select-none pointer-events-none">
        <img 
          src={waveLeft} 
          alt="" 
          className="absolute left-0 bottom-0 h-full w-auto object-contain object-left-bottom" 
        />
        <img 
          src={waveRight} 
          alt="" 
          className="absolute right-0 bottom-0 h-full w-auto object-contain object-right-bottom" 
        />
      </div>

      {/* Main Footer */}
      <footer className="bg-[#0a0f1c] text-white pb-12 pt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-left">
            
            {/* ENDEREÇO */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Endereço</p>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium leading-relaxed">
                  Rua Lagoa, 2110, Centro -<br />Extremoz - RN - 59575-000
                </span>
              </div>
            </div>

            {/* HORÁRIO DE FUNCIONAMENTO */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Horário de Funcionamento</p>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Seg à Sex das 07h às 13h</span>
              </div>
            </div>

            {/* CONTATO */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contato</p>
              <div className="space-y-3">
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

            {/* SIGA-NOS */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Siga-nos</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Logos Section - Centered side-by-side */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-12 pt-8 border-t border-slate-900">
            <div className="max-w-[200px] h-[60px] flex items-center justify-center">
              <img 
                src={logoFooter} 
                alt="Cultura - Portal de Editais de Extremoz" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="max-w-[240px] h-[60px] flex items-center justify-center">
              <img 
                src={footerLogo} 
                alt="SECULT e Prefeitura de Extremoz" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-900/50 text-center">
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
              © PREFEITURA MUNICIPAL DE EXTREMOZ - RN | DESENVOLVIDO POR VIAA SISTEMAS
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;