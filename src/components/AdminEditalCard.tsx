"use client";

import React, { useState } from 'react';
import { Eye, FileText, Cloud, Paperclip, Users, Calendar, Upload, Clock, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
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
import { toast } from 'sonner';

interface AdminEditalCardProps {
  edital: EditalDetail;
}

const AdminEditalCard = ({ edital }: AdminEditalCardProps) => {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProrrogacao, setIsProrrogacao] = useState(false);
  
  const [dates, setDates] = useState({
    abertura: edital.dataAbertura?.split('T')[0] || '',
    horaAbertura: edital.dataAbertura?.split('T')[1]?.substring(0, 5) || '08:00',
    encerramento: edital.dataEncerramento?.split('T')[0] || '',
    horaEncerramento: edital.dataEncerramento?.split('T')[1]?.substring(0, 5) || '23:59',
    prorrogacaoInicio: '',
    prorrogacaoHoraInicio: '08:00',
    prorrogacaoFim: '',
    prorrogacaoHoraFim: '23:59',
  });

  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  const handleFinalConfirm = () => {
    // Aqui salvaríamos no banco futuramente
    toast.success("Alterações salvas com sucesso!");
    setShowConfirm(false);
    setScheduleOpen(false);
  };

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
        <div 
          className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors group" 
          onClick={() => setScheduleOpen(true)}
          title="Clique para programar data/hora"
        >
          <Calendar size={14} />
          <span>{edital.terminoInscricao}</span>
          <Clock size={14} className="ml-0.5 text-blue-500" />
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

        <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-[11px] h-11 rounded-xl flex gap-2">
          <Cloud size={14} /> Resultados
        </Button>

        <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-[11px] h-11 rounded-xl flex gap-2">
          <Paperclip size={14} /> Anexos
        </Button>
      </div>

      {/* Diálogo de Programação */}
      <Dialog open={scheduleOpen} onOpenChange={(val) => {
        setScheduleOpen(val);
        if (!val) setShowConfirm(false);
      }}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto">
          {!showConfirm ? (
            <>
              <DialogHeader className="mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Clock size={24} />
                </div>
                <DialogTitle className="text-2xl font-bold text-slate-900">Programar Data/Hora</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Defina o período em que o botão "Inscrever-se" ficará disponível.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Abertura das Inscrições</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      type="date" 
                      value={dates.abertura} 
                      onChange={(e) => setDates({...dates, abertura: e.target.value})}
                      className="rounded-xl h-12 border-slate-200 focus:ring-blue-500"
                    />
                    <Input 
                      type="time" 
                      value={dates.horaAbertura} 
                      onChange={(e) => setDates({...dates, horaAbertura: e.target.value})}
                      className="rounded-xl h-12 border-slate-200 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Encerramento das Inscrições</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      type="date" 
                      value={dates.encerramento} 
                      onChange={(e) => setDates({...dates, encerramento: e.target.value})}
                      className="rounded-xl h-12 border-slate-200 focus:ring-blue-500"
                    />
                    <Input 
                      type="time" 
                      value={dates.horaEncerramento} 
                      onChange={(e) => setDates({...dates, horaEncerramento: e.target.value})}
                      className="rounded-xl h-12 border-slate-200 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold text-slate-900">Prorrogação</Label>
                      <p className="text-xs text-slate-500">Ativar período extra de inscrições</p>
                    </div>
                    <Switch 
                      checked={isProrrogacao} 
                      onCheckedChange={setIsProrrogacao} 
                    />
                  </div>

                  {isProrrogacao && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-4">
                        <Label className="text-xs font-bold text-blue-600 uppercase tracking-widest">Início da Prorrogação</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            type="date" 
                            value={dates.prorrogacaoInicio} 
                            onChange={(e) => setDates({...dates, prorrogacaoInicio: e.target.value})}
                            className="rounded-xl h-12 border-blue-100 focus:ring-blue-500"
                          />
                          <Input 
                            type="time" 
                            value={dates.prorrogacaoHoraInicio} 
                            onChange={(e) => setDates({...dates, prorrogacaoHoraInicio: e.target.value})}
                            className="rounded-xl h-12 border-blue-100 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-xs font-bold text-blue-600 uppercase tracking-widest">Término da Prorrogação</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            type="date" 
                            value={dates.prorrogacaoFim} 
                            onChange={(e) => setDates({...dates, prorrogacaoFim: e.target.value})}
                            className="rounded-xl h-12 border-blue-100 focus:ring-blue-500"
                          />
                          <Input 
                            type="time" 
                            value={dates.prorrogacaoHoraFim} 
                            onChange={(e) => setDates({...dates, prorrogacaoHoraFim: e.target.value})}
                            className="rounded-xl h-12 border-blue-100 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirmar Alteração?</h2>
              <p className="text-slate-500 font-medium mb-10">
                Você está prestes a alterar o cronograma de inscrições deste edital. Deseja continuar?
              </p>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleFinalConfirm} 
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100"
                >
                  Confirmar
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowConfirm(false)} 
                  className="w-full h-12 rounded-xl font-bold text-slate-500"
                >
                  Voltar e Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <EditalDetailsDialog 
        edital={edital} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
    </div>
  );
};

export default AdminEditalCard;