"use client";

import React, { useState } from 'react';
import { Eye, FileText, Cloud, Paperclip, Users, Calendar, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditalDetail } from '@/data/editais';
import EditalDetailsDialog from './EditalDetailsDialog';

interface AdminEditalCardProps {
  edital: EditalDetail;
}

const AdminEditalCard = ({ edital }: AdminEditalCardProps) => {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative">
      <div className="absolute top-4 right-4 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100">
        {edital.number}
      </div>
      
      <div className="flex justify-between items-start mb-4 gap-4 pr-8">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{edital.title}</h3>
        <span className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
          edital.status === 'Aberto' 
            ? 'bg-emerald-50 text-emerald-600' 
            : 'bg-rose-50 text-rose-600'
        }`}>
          {edital.status}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-8">
        <div className="flex items-center gap-1.5">
          <Users size={14} />
          <span>0 inscrições</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>{edital.terminoInscricao}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button 
          onClick={() => navigate(`/admin/inscricoes/${edital.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] h-11 rounded-xl flex gap-2 shadow-lg shadow-blue-100"
        >
          <Eye size={14} /> Ver Inscrições
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setDetailsOpen(true)}
          className="border-slate-100 text-slate-600 font-bold text-[11px] h-11 rounded-xl flex gap-2 hover:bg-slate-50"
        >
          <FileText size={14} /> Ver detalhes
        </Button>

        {/* Pop-up Resultados */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-[11px] h-11 rounded-xl flex gap-2">
              <Cloud size={14} /> Resultados
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle>Gerenciar Resultados</DialogTitle>
              <DialogDescription>
                Faça o upload dos arquivos de resultado para este edital.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-sm font-bold text-slate-600">Clique para enviar o PDF</p>
                <p className="text-[10px] text-slate-400 mt-1">Tamanho máximo: 10MB</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">Publicar Resultado</Button>
          </DialogContent>
        </Dialog>

        {/* Pop-up Anexos */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-[11px] h-11 rounded-xl flex gap-2">
              <Paperclip size={14} /> Anexos
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle>Gerenciar Anexos</DialogTitle>
              <DialogDescription>
                Adicione documentos complementares ao edital.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-sm font-bold text-slate-600">Clique para enviar anexos</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">Salvar Anexos</Button>
          </DialogContent>
        </Dialog>
      </div>

      <EditalDetailsDialog 
        edital={edital} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
    </div>
  );
};

export default AdminEditalCard;