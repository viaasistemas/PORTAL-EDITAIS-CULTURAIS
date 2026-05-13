"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
          
          {/* Logo Section */}
          <div className="flex flex-col min-w-[200px]">
            <span className="text-3xl font-bold tracking-tight text-white leading-none">CULTURA</span>
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.1em] mt-1">Portal de Editais de Extremoz</span>
          </div>

          {/* Endereço e Contato Grouped */}
          <div className="space-y-10 min-w-[250px]">
            {/* Endereço Section */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Endereço</p>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-300 font-medium leading-tight">
                  Rua Lagoa, 2110, Centro -<br />Extremoz - RN - 59575-000
                </span>
              </div>
            </div>

            {/* Contato Section */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contato</p>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <span className="text-[11px] text-slate-300 font-medium">Telefone: (84) 3279-4910</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span className="text-[11px] text-slate-300 font-medium">Email: gabinetecivilextremoz@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Horário Section */}
          <div className="space-y-3 min-w-[200px]">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Horário de Funcionamento</p>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-blue-400 shrink-0" />
              <span className="text-[11px] text-slate-300 font-medium">Expediente: Seg à Sex das 07h às 13h</span>
            </div>
          </div>

          {/* Institutions Section */}
          <div className="space-y-4 min-w-[200px]">
            <div>
              <p className="text-sm font-bold text-slate-200">Prefeitura Municipal de Extremoz</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-200">SECRETARIA MUNICIPAL DE CULTURA - SECULT</p>
            </div>
          </div>

          {/* Social Section */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Siga-nos</p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-all border border-slate-800">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Credits Unified */}
        <div className="pt-8 border-t border-slate-900 text-center">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            © Prefeitura Municipal de Extremoz - RN | Desenvolvido por VIAA SISTEMAS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;