"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Copy, Printer, Upload, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface InscricaoDialogProps {
  edital: { id: string; title: string; number: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'form' | 'confirm' | 'success';

const InscricaoDialog = ({ edital, open, onOpenChange }: InscricaoDialogProps) => {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [protocol, setProtocol] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.cpf || !formData.birthDate) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setLoading(true);
    const generatedProtocol = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    try {
      const { error } = await supabase.from('inscricoes').insert({
        edital_id: edital.id,
        protocol: generatedProtocol,
        full_name: formData.fullName,
        cpf: formData.cpf,
        birth_date: formData.birthDate,
        status: 'Pendente'
      });

      if (error) throw error;

      setProtocol(generatedProtocol);
      setStep('success');
      toast.success("Inscrição realizada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao salvar inscrição:", error);
      toast.error("Erro ao processar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyProtocol = () => {
    navigator.clipboard.writeText(protocol);
    toast.success("Protocolo copiado!");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (step === 'success' && !val) {
        setStep('form');
        setFormData({ fullName: '', cpf: '', birthDate: '' });
      }
      onOpenChange(val);
    }}>
      <DialogContent className="max-w-xl rounded-[2.5rem] p-8">
        {step === 'form' && (
          <>
            <DialogHeader className="mb-6">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Inscrição no Edital</p>
              <DialogTitle className="text-2xl font-bold text-slate-900">Edital: {edital.title}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">Nome Completo *</Label>
                  <Input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo" 
                    className="rounded-xl border-slate-200 h-12" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase">CPF *</Label>
                    <Input 
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00" 
                      className="rounded-xl border-slate-200 h-12" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase">Data de Nascimento *</Label>
                    <Input 
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="rounded-xl border-slate-200 h-12" 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase">Anexo {i} {i <= 3 ? '*' : ''}</Label>
                    <div className="relative">
                      <Input type="file" className="hidden" id={`anexo-${i}`} />
                      <label htmlFor={`anexo-${i}`} className="flex items-center justify-between px-4 h-12 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                        <span className="text-xs text-slate-400">Selecionar</span>
                        <Upload size={14} className="text-slate-400" />
                      </label>
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">Portfolio</Label>
                  <div className="relative">
                    <Input type="file" className="hidden" id="portfolio" />
                    <label htmlFor="portfolio" className="flex items-center justify-between px-4 h-12 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                      <span className="text-xs text-slate-400">Selecionar</span>
                      <Upload size={14} className="text-slate-400" />
                    </label>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold text-slate-500">Cancelar</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-blue-100">Enviar Documentação</Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 'confirm' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirmar Envio?</h2>
            <p className="text-slate-500 font-medium mb-10">Certifique-se de que todos os dados estão corretos.</p>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleConfirm} 
                disabled={loading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Confirmar Envio"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep('form')} 
                className="w-full h-12 rounded-xl font-bold text-slate-500"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Inscrição Confirmada!</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">Número do Protocolo</p>
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-10">
              <p className="text-4xl font-mono font-bold text-blue-600 tracking-tighter">{protocol}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button variant="outline" onClick={copyProtocol} className="h-14 rounded-2xl border-slate-200 font-bold flex gap-2">
                <Copy size={18} /> Copiar Protocolo
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-bold flex gap-2">
                <Printer size={18} /> Imprimir Comprovante
              </Button>
            </div>
            <Button 
              onClick={() => onOpenChange(false)} 
              className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold text-lg"
            >
              Entendido
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InscricaoDialog;