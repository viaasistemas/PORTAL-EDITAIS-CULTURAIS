"use client";

import React from 'react';
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { EditalDetail } from '@/data/editais';

interface EditalCardProps {
  edital: EditalDetail;
}

const EditalCard = ({ edital }: EditalCardProps) => {
  const navigate = useNavigate();

  // Lógica para verificar se as inscrições estão abertas
  const now = new Date();
  const openingDate = edital.dataAbertura ? new Date(edital.dataAbertura) : null;
  const closingDate = edital.dataEncerramento ? new Date(edital.dataEncerramento) : null;

  const isRegistrationOpen = openingDate && closingDate 
    ? now >= openingDate && now <= closingDate
    : edital.status === 'Aberto';

  const isUpcoming = openingDate && now < openingDate;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">{edital.tipo}</span>
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{edital.title}</h3>
        </div>
        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100">
          {edital.number}
        </div>
      </div>

      <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
        {edital.subtitle}
      </p>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <Calendar size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider">Encerramento</span>
            <span className="text-xs font-bold text-slate-700">{edital.terminoInscricao}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <Clock size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
            <span className={`text-xs font-bold ${isRegistrationOpen ? 'text-emerald-600' : isUpcoming ? 'text-blue-500' : 'text-rose-600'}`}>
              {isRegistrationOpen ? 'Inscrições Abertas' : isUpcoming ? 'Abre em breve' : 'Inscrições Encerradas'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-1 gap-3">
        {isRegistrationOpen ? (
          <Button 
            onClick={() => navigate(`/inscricao/${edital.id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-2xl flex gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            Inscrever-se <ArrowRight size={16} />
          </Button>
        ) : isUpcoming ? (
          <Button 
            disabled
            className="w-full bg-slate-100 text-slate-400 font-bold h-12 rounded-2xl flex gap-2 cursor-not-allowed"
          >
            Aguardando Abertura <Clock size={16} />
          </Button>
        ) : (
          <Button 
            disabled
            className="w-full bg-rose-50 text-rose-400 font-bold h-12 rounded-2xl flex gap-2 cursor-not-allowed"
          >
            Inscrições Encerradas
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => navigate(`/editais/${edital.id}`)}
          className="w-full border-slate-100 text-slate-600 font-bold h-12 rounded-2xl flex gap-2 hover:bg-slate-50 transition-all"
        >
          <FileText size={16} /> Ver Edital Completo
        </Button>
      </div>
    </div>
  );
};

export default EditalCard;