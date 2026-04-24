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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Copy, Printer, Upload, Loader2, AlertCircle, FileCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface InscricaoDialogProps {
  edital: { id: string; title: string; number: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'form' | 'confirm' | 'success';
type TipoInscricao = 'PF' | 'PJ' | 'GC';

const InscricaoDialog = ({ edital, open, onOpenChange }: InscricaoDialogProps) => {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [tipoInscricao, setTipoInscricao] = useState<TipoInscricao>('PF');
  
  const [formData, setFormData] = useState({
    fullName: '',
    razaoSocial: '',
    cpf: '',
    cnpj: '',
  });

  const [files, setFiles] = useState<Record<string, string>>({
    anexo1: '',
    anexo2: '',
    anexo3: '',
    portfolio: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [field]: e.target.files![0].name }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isPJ = tipoInscricao === 'PJ';
    const nameField = isPJ ? formData.razaoSocial : formData.fullName;
    const idField = isPJ ? formData.cnpj : formData.cpf;

    if (!nameField || !idField) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!files.anexo1 || !files.anexo2) {
      toast.error("Os anexos 1 e 2 são obrigatórios.");
      return;
    }

    setStep('confirm');
  };

  const handleConfirm = async () => {
    setLoading(true);
    const generatedProtocol = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    try {
      const isPJ = tipoInscricao === 'PJ';
      const { error } = await supabase.from('inscricoes').insert({
        edital_id: edital.id,
        protocol: generatedProtocol,
        full_name: isPJ ? formData.razaoSocial : formData.fullName,
        cpf: isPJ ? formData.cnpj : formData.cpf,
        status: 'Pendente'
      });

      if (error) throw error;

      setProtocol(generatedProtocol);
      setStep('success');
      toast.success("Inscrição realizada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao salvar inscrição:", error);
      toast.error(`Erro ao processar inscrição. Tente novamente.`);
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
      if (!val) {
        setTimeout(() => {
          setStep('form');
          setFormData({ fullName: '', razaoSocial: '', cpf: '', cnpj: '' });
          setFiles({ anexo1: '', anexo2: '', anexo3: '', portfolio: '' });
          setTipoInscricao('PF');
        }, 300);
      }
      onOpenChange(val);
    }}>
      <DialogContent className="max-w-xl rounded-[2.5rem] p-8">
        {step === 'form' && (
          <>
            <DialogHeader className="mb-6">
              <p className="text-[10px] font-bold text-[#2b59c3] uppercase tracking-widest mb-2">Inscrição no Edital</p>
              <DialogTitle className="text-2xl font-bold text-slate-900">Edital: {edital.title}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">Tipo de Proponente *</Label>
                  <Select 
                    value={tipoInscricao} 
                    onValueChange={(val: TipoInscricao) => setTipoInscricao(val)}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="PF">Pessoa Física</SelectItem>
                      <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                      <SelectItem value="GC">Grupo/Coletivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {tipoInscricao === 'PJ' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-xs font-bold text-slate-500 uppercase">Razão Social *</Label>
                      <Input 
                        name="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={handleInputChange}
                        placeholder="Nome da empresa" 
                        className="rounded-xl border-slate-200 h-12" 
                        required 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-xs font-bold text-slate-500 uppercase">CNPJ *</Label>
                      <Input 
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        placeholder="00.000.000/0000-00" 
                        className="rounded-xl border-slate-200 h-12" 
                        required 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
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
                    <div className="space-y-2 md:col-span-2">
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
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'anexo1', label: 'Anexo 1 *', required: true },
                  { id: 'anexo2', label: 'Anexo 2 *', required: true },
                  { id: 'anexo3', label: 'Anexo 3', required: false },
                  { id: 'portfolio', label: 'Portfolio', required: false },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase">{field.label}</Label>
                    <div className="relative">
                      <Input 
                        type="file" 
                        className="hidden" 
                        id={field.id} 
                        required={field.required}
                        onChange={(e) => handleFileChange(e, field.id)}
                      />
                      <label 
                        htmlFor={field.id} 
                        className={`flex items-center justify-between px-4 h-12 rounded-xl border transition-all cursor-pointer ${
                          files[field.id] 
                            ? 'border-emerald-200 bg-emerald-50' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`text-xs truncate max-w-[120px] ${files[field.id] ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                          {files[field.id] || "Selecionar"}
                        </span>
                        {files[field.id] ? (
                          <FileCheck size={14} className="text-emerald-500" />
                        ) : (
                          <Upload size={14} className="text-slate-400" />
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold text-slate-500">Cancelar</Button>
                <Button type="submit" className="bg-[#2b59c3] hover:bg-[#1e44a3] text-white rounded-xl px-8 font-bold shadow-lg shadow-blue-100">Enviar Documentação</Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 'confirm' && (
          <div className="py-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-slate-900">Confirmar o Envio</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proponente</p>
                  <p className="text-sm font-bold text-slate-900">{tipoInscricao === 'PJ' ? formData.razaoSocial : formData.fullName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tipoInscricao === 'PJ' ? 'CNPJ' : 'CPF'}</p>
                  <p className="text-sm font-bold text-slate-900">{tipoInscricao === 'PJ' ? formData.cnpj : formData.cpf}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Arquivos Anexados</p>
                  <ul className="mt-1 space-y-1">
                    {Object.entries(files).map(([key, name]) => name && (
                      <li key={key} className="text-xs text-slate-600 flex items-center gap-2">
                        <FileCheck size={12} className="text-emerald-500" /> {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic mt-4">Ao confirmar, sua inscrição será enviada para análise e um protocolo será gerado.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleConfirm} 
                disabled={loading}
                className="w-full h-14 bg-[#2b59c3] hover:bg-[#1e44a3] text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Confirmar e Enviar"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep('form')} 
                className="w-full h-12 rounded-xl font-bold text-slate-500"
              >
                Voltar e Editar
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
              <p className="text-4xl font-mono font-bold text-[#2b59c3] tracking-tighter">{protocol}</p>
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