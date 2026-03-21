"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Upload, Loader2, AlertCircle, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface DocumentacaoDialogProps {
  edital: { id: string; title: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'form' | 'confirm' | 'success';

const DocumentacaoDialog = ({ edital, open, onOpenChange }: DocumentacaoDialogProps) => {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    protocol: '',
    fileName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files) {
      setFormData(prev => ({ ...prev, fileName: files[0].name }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.cpf || !formData.protocol || !formData.fileName) {
      toast.error("Por favor, preencha todos os campos e anexe o arquivo.");
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('documentacao').insert({
        edital_id: edital.id,
        full_name: formData.fullName,
        cpf: formData.cpf,
        birth_date: formData.birthDate,
        protocol: formData.protocol,
        file_name: formData.fileName
      });

      if (error) throw error;

      setStep('success');
      toast.success("Documentação enviada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao enviar documentação:", error);
      toast.error("Erro ao processar envio. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) {
        setStep('form');
        setFormData({ fullName: '', cpf: '', birthDate: '', protocol: '', fileName: '' });
      }
      onOpenChange(val);
    }}>
      <DialogContent className="max-w-xl rounded-[2.5rem] p-8">
        {step === 'form' && (
          <>
            <DialogHeader className="mb-6">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Anexar Documentação</p>
              <DialogTitle className="text-2xl font-bold text-slate-900">{edital.title}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleNext} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</Label>
                <Input name="fullName" value={formData.fullName} onChange={handleInputChange} className="rounded-xl h-12" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">CPF</Label>
                  <Input name="cpf" value={formData.cpf} onChange={handleInputChange} className="rounded-xl h-12" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">Data de Nascimento</Label>
                  <Input name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} className="rounded-xl h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Protocolo da Inscrição</Label>
                <Input name="protocol" value={formData.protocol} onChange={handleInputChange} className="rounded-xl h-12" required />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Arquivo (PDF)</Label>
                <div className="relative">
                  <Input type="file" name="file" accept=".pdf" className="hidden" id="doc-file" onChange={handleInputChange} />
                  <label htmlFor="doc-file" className="flex items-center justify-between px-4 h-12 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="text-xs text-slate-400">{formData.fileName || "Selecionar PDF"}</span>
                    <Upload size={14} className="text-slate-400" />
                  </label>
                </div>
              </div>

              <DialogFooter className="gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold text-slate-500">Cancelar</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 font-bold">Enviar Documentação</Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 'confirm' && (
          <div className="py-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-slate-900">Confirmar Envio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-sm text-slate-600"><strong>Nome:</strong> {formData.fullName}</p>
              <p className="text-sm text-slate-600"><strong>CPF:</strong> {formData.cpf}</p>
              <p className="text-sm text-slate-600"><strong>Data de Nascimento:</strong> {formData.birthDate}</p>
              <p className="text-sm text-slate-600"><strong>Protocolo:</strong> {formData.protocol}</p>
              <p className="text-sm text-slate-600"><strong>Arquivo:</strong> {formData.fileName}</p>
              <p className="text-sm font-bold text-slate-900 mt-4">Confirma o envio das informações acima?</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('form')} className="flex-1 h-12 rounded-xl font-bold">Voltar</Button>
              <Button onClick={handleConfirm} disabled={loading} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
                {loading ? <Loader2 className="animate-spin" /> : "Confirmar e Enviar"}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Envio Concluído</h2>
            <p className="text-emerald-600 font-bold text-lg mb-2">Enviado com Sucesso!</p>
            <p className="text-slate-500 font-medium mb-10">Seu arquivo foi recebido e será analisado pela equipe administrativa.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-bold flex gap-2">
                <Printer size={18} /> Imprimir Comprovante
              </Button>
              <Button onClick={() => onOpenChange(false)} className="h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold">
                Fechar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentacaoDialog;