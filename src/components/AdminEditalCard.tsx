"use client";

import React, { useState } from 'react';
import { Eye, FileText, Cloud, Paperclip, Users, Calendar, Clock, Save, AlertCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { EditalDetail } from '@/data/editais';
import EditalDetailsDialog from './EditalDetailsDialog';
import AdminFileUploadDialog from './AdminFileUploadDialog';
import { toast } from 'sonner';

interface AdminEditalCardProps {
  edital: EditalDetail;
}

const AdminEditalCard = ({ edital }: AdminEditalCardProps) => {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const [isProrrogacao, setIsProrrogacao] = useState(false);
  const [isRecurso, setIsRecurso] = useState(false);
  const [isDocumentacao, setIsDocumentacao] = useState(false);
  
  const [dates, setDates] = useState({
    abertura: edital.dataAbertura?.split('T')[0] || '',
    horaAbertura: edital.dataAbertura?.split('T')[1]?.substring(0, 5) || '08:00',
    encerramento: edital.dataEncerramento?.split('T')[0] || '',
    horaEncerramento: edital.dataEncerramento?.split('T')[1]?.substring(0, 5) || '23:59',
    prorrogacaoInicio: '',
    prorrogacaoHoraInicio: '08:00',
    prorrogacaoFim: '',
    prorrogacaoHoraFim: '23:59',
    recursoInicio: '',
    recursoHoraInicio: '08:00',
    recursoFim: '',
    recursoHoraFim: '23:59',
    docInicio: '',
    docHoraInicio: '08:00',
    docFim: '',
    docHoraFim: '23:59',
  });

  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  const handleFinalConfirm = () => {
    toast.success("Configurações do edital atualizadas!");
    setShowConfirm(false);
    setScheduleOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative">
      <div className="absolute top-4 right-4 px-3 py-1 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 font-bold text-[10px] border border-slate-100">
        #{edital.number}
      </div>
      
      <div className="flex justify-between items-start mb-4 gap-4 pr-16">
        <h3 className="text-xl font-bold text-slate-900 leading-tight">{edital.title}</h3>
        <div className="flex flex-col items-end gap-2">
          <span className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            edital.status === 'Aberto' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {edital.status}
          </span>
          {!isVisible && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-bold rounded uppercase">Invisível</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-8 text-slate-500 font-bold mb-10">
        <div className="flex items-center gap-2.5">
          <Users size={22} className="text-blue-600" />
          <span className="text-lg">0 inscrições</span>
        </div>
        <div 
          className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition-colors group" 
          onClick={() => setScheduleOpen(true)}
        >
          <Calendar size={22} className="text-blue-600" />
          <span className="text-lg">Programar</span>
          <Clock size={18} className="ml-0.5 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <Button 
          onClick={() => navigate(`/admin/inscricoes/${edital.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base h-14 rounded-xl flex gap-2 shadow-lg shadow-blue-100"
        >
          <Eye size={18} /> Ver Inscrições
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setDetailsOpen(true)}
          className="border-slate-100 text-slate-600 font-bold text-base h-14 rounded-xl flex gap-2 hover:bg-slate-50"
        >
          <FileText size={18} /> Ver detalhes
        </Button>

        <Button 
          variant="secondary" 
          onClick={() => setResultsOpen(true)}
          className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-base h-14 rounded-xl flex gap-2"
        >
          <Cloud size={18} /> Resultados
        </Button>

        <Button 
          variant="secondary" 
          onClick={() => setAttachmentsOpen(true)}
          className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-base h-14 rounded-xl flex gap-2"
        >
          <Paperclip size={18} /> Anexos
        </Button>
      </div>

      <Dialog open={scheduleOpen} onOpenChange={(val) => {
        setScheduleOpen(val);
        if (!val) setShowConfirm(false);
      }}>
        <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto">
          {!showConfirm ? (
            <>
              <DialogHeader className="mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Clock size={24} />
                </div>
                <DialogTitle className="text-2xl font-bold text-slate-900">Programar Data/Hora</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Configure a visibilidade e os prazos do edital.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isVisible ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                      <Globe size={18} />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-slate-900">Visibilidade no Portal</Label>
                      <p className="text-[10px] text-slate-500 font-medium">Define se o edital aparece para o público</p>
                    </div>
                  </div>
                  <Switch checked={isVisible} onCheckedChange={setIsVisible} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Abertura</Label>
                    <div className="flex flex-col gap-2">
                      <Input type="date" value={dates.abertura} onChange={(e) => setDates({...dates, abertura: e.target.value})} className="rounded-xl h-11" />
                      <Input type="time" value={dates.horaAbertura} onChange={(e) => setDates({...dates, horaAbertura: e.target.value})} className="rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Encerramento</Label>
                    <div className="flex flex-col gap-2">
                      <Input type="date" value={dates.encerramento} onChange={(e) => setDates({...dates, encerramento: e.target.value})} className="rounded-xl h-11" />
                      <Input type="time" value={dates.horaEncerramento} onChange={(e) => setDates({...dates, horaEncerramento: e.target.value})} className="rounded-xl h-11" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900">Prorrogação</Label>
                      <Switch checked={isProrrogacao} onCheckedChange={setIsProrrogacao} />
                    </div>
                    {isProrrogacao && (
                      <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-blue-600 uppercase">Início</Label>
                          <Input type="date" value={dates.prorrogacaoInicio} onChange={(e) => setDates({...dates, prorrogacaoInicio: e.target.value})} className="h-10 rounded-lg" />
                          <Input type="time" value={dates.prorrogacaoHoraInicio} onChange={(e) => setDates({...dates, prorrogacaoHoraInicio: e.target.value})} className="h-10 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-blue-600 uppercase">Fim</Label>
                          <Input type="date" value={dates.prorrogacaoFim} onChange={(e) => setDates({...dates, prorrogacaoFim: e.target.value})} className="h-10 rounded-lg" />
                          <Input type="time" value={dates.prorrogacaoHoraFim} onChange={(e) => setDates({...dates, prorrogacaoHoraFim: e.target.value})} className="h-10 rounded-lg" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900">Recurso</Label>
                      <Switch checked={isRecurso} onCheckedChange={setIsRecurso} />
                    </div>
                    {isRecurso && (
                      <div className="grid grid-cols-2 gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-red-600 uppercase">Início</Label>
                          <Input type="date" value={dates.recursoInicio} onChange={(e) => setDates({...dates, recursoInicio: e.target.value})} className="h-10 rounded-lg" />
                          <Input type="time" value={dates.recursoHoraInicio} onChange={(e) => setDates({...dates, recursoHoraInicio: e.target.value})} className="h-10 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-red-600 uppercase">Fim</Label>
                          <Input type="date" value={dates.recursoFim} onChange={(e) => setDates({...dates, recursoFim: e.target.value})} className="h-10 rounded-lg" />
                          <Input type="time" value={dates.recursoHoraFim} onChange={(e) => setDates({...dates, recursoHoraFim: e.target.value})} className="h-10 rounded-lg" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900">Documentação</Label>
                      <Switch checked={isDocumentacao} onCheckedChange={setIsDocumentacao} />
                    </div>
                    {isDocumentacao && (
                      <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-emerald-600 uppercase">Início</Label>
                          <Input type="date" value={dates.docInicio} onChange={(e) => setDates({...dates, docInicio: e.target.value})} className="h-10 rounded-lg" />
                          <Input type="time" value={dates.docHoraInicio} onChange={(e) => setDates({...dates, docHoraInicio: e.target.value})} className="h-10 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-emerald-600 uppercase">Fim</Label>
                          <Input type="date" value={dates.docFim} onChange={(e) => setDates({...dates, docFim: e.target.value})} className="h-10 rounded-lg" />
                          <Input type="time" value={dates.docHoraFim} onChange={(e) => setDates({...dates, docHoraFim: e.target.value})} className="h-10 rounded-lg" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-10 gap-3">
                <Button variant="ghost" onClick={() => setScheduleOpen(false)} className="rounded-xl font-bold text-slate-500">Cancelar</Button>
                <Button onClick={handleSaveClick} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold flex gap-2 shadow-lg shadow-blue-100">
                  <Save size={18} /> Salvar Alteração
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="text-center py-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirmar Alterações?</h2>
              <p className="text-slate-500 font-medium mb-10">
                As novas configurações de visibilidade e prazos serão aplicadas imediatamente ao portal público.
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={handleFinalConfirm} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100">Confirmar</Button>
                <Button variant="ghost" onClick={() => setShowConfirm(false)} className="w-full h-12 rounded-xl font-bold text-slate-500">Voltar e Editar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AdminFileUploadDialog 
        title="Anexar Resultados" 
        type="Resultados" 
        open={resultsOpen} 
        onOpenChange={setResultsOpen} 
        editalTitle={edital.title} 
      />
      <AdminFileUploadDialog 
        title="Anexar Anexos" 
        type="Anexos" 
        open={attachmentsOpen} 
        onOpenChange={setAttachmentsOpen} 
        editalTitle={edital.title} 
      />

      <EditalDetailsDialog edital={edital} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
};

export default AdminEditalCard;