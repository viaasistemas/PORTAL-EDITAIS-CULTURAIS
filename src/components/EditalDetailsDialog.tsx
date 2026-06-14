"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EditalDetail } from '@/data/editais';
import { toast } from 'sonner';

interface EditalDetailsDialogProps {
  edital: EditalDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editable?: boolean;
}

const EditalDetailsDialog = ({ edital, open, onOpenChange, editable = false }: EditalDetailsDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    valorTotal: '',
    valorMaximo: '',
    vagas: '',
    requisitos: '',
    documentos: '',
  });

  useEffect(() => {
    if (edital) {
      setFormData({
        title: edital.title || '',
        subtitle: edital.subtitle || '',
        description: edital.description || '',
        valorTotal: edital.valorTotal || '',
        valorMaximo: edital.valorMaximo || '',
        vagas: edital.vagas || '',
        requisitos: edital.requisitos || '',
        documentos: edital.documentos || '',
      });
    }
  }, [edital, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    const savedEditais = localStorage.getItem('admin_editais_list');
    const currentEditais: EditalDetail[] = savedEditais ? JSON.parse(savedEditais) : [];
    
    const updatedEditais = currentEditais.map(item => {
      if (item.id === edital.id) {
        return {
          ...item,
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
          valorTotal: formData.valorTotal,
          valorMaximo: formData.valorMaximo,
          vagas: formData.vagas,
          requisitos: formData.requisitos,
          documentos: formData.documentos,
        };
      }
      return item;
    });

    localStorage.setItem('admin_editais_list', JSON.stringify(updatedEditais));
    window.dispatchEvent(new Event('storage'));
    toast.success("Alterações do edital salvas com sucesso!");
    onOpenChange(false);
  };

  // Carrega configurações de agendamento para exibir data e hora corretas
  const settingsKey = `edital_settings_${edital?.id}`;
  const savedSettings = typeof window !== 'undefined' ? localStorage.getItem(settingsKey) : null;
  const settings = savedSettings ? JSON.parse(savedSettings) : null;

  const formatDateTime = (dateStr: string | undefined, timeStr?: string) => {
    if (!dateStr) return "Não definida";
    const date = timeStr ? new Date(`${dateStr}T${timeStr}`) : new Date(dateStr);
    return date.toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' às');
  };

  const displayInicio = settings?.dates?.abertura 
    ? formatDateTime(settings.dates.abertura, settings.dates.horaAbertura)
    : formatDateTime(edital?.dataAbertura);
    
  const displayFim = settings?.dates?.encerramento 
    ? formatDateTime(settings.dates.encerramento, settings.dates.horaEncerramento)
    : formatDateTime(edital?.dataEncerramento);

  if (!edital) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8">
        <DialogHeader className="mb-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {editable ? "Editar Informações do Edital" : "Detalhes do Edital"}
          </p>
          {editable ? (
            <div className="space-y-4 w-full mt-2">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título do Edital</Label>
                <Input name="title" value={formData.title} onChange={handleInputChange} className="h-12 rounded-xl border-slate-200 font-bold text-slate-900" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtítulo / Resumo</Label>
                <Input name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="h-12 rounded-xl border-slate-200 text-slate-600" />
              </div>
            </div>
          ) : (
            <>
              <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">{edital.title}</DialogTitle>
              <DialogDescription className="text-slate-500 font-bold text-base mt-2">
                {edital.subtitle}
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        <div className="space-y-10">
          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Descrição</h4>
            {editable ? (
              <Textarea name="description" value={formData.description} onChange={handleInputChange} className="rounded-xl border-slate-200 min-h-[100px]" />
            ) : (
              <p className="text-base text-slate-600 leading-relaxed">{edital.description}</p>
            )}
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Categoria</h4>
            <div className="flex flex-wrap gap-2">
              {edital.categories.map((cat, i) => (
                <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg px-4 py-1.5 text-sm font-bold">
                  {cat}
                </Badge>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Total</h4>
              {editable ? (
                <Input name="valorTotal" value={formData.valorTotal} onChange={handleInputChange} className="h-11 rounded-xl border-slate-200" />
              ) : (
                <p className="text-xl font-bold text-blue-600">{edital.valorTotal || "Não informado"}</p>
              )}
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Máximo por Projeto</h4>
              {editable ? (
                <Input name="valorMaximo" value={formData.valorMaximo} onChange={handleInputChange} className="h-11 rounded-xl border-slate-200" />
              ) : (
                <p className="text-xl font-bold text-blue-600">{edital.valorMaximo || "Não informado"}</p>
              )}
            </section>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Início da Inscrição</h4>
              <p className="text-base font-bold text-slate-700">{displayInicio}</p>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Término da Inscrição</h4>
              <p className="text-base font-bold text-slate-700">{displayFim}</p>
            </section>
          </div>

          <Separator className="bg-slate-100" />

          {edital.etapas && edital.etapas.length > 0 && (
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Etapas do Processo</h4>
              <ul className="space-y-3">
                {edital.etapas.map((etapa, i) => (
                  <li key={i} className="text-base text-slate-600 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {etapa}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requisitos</h4>
            {editable ? (
              <Textarea name="requisitos" value={formData.requisitos} onChange={handleInputChange} className="rounded-xl border-slate-200 min-h-[80px]" />
            ) : (
              <p className="text-base text-slate-600 leading-relaxed">{edital.requisitos || "Não informado"}</p>
            )}
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Documentos Necessários</h4>
            {editable ? (
              <Textarea name="documentos" value={formData.documentos} onChange={handleInputChange} className="rounded-xl border-slate-200 min-h-[80px]" />
            ) : (
              <p className="text-base text-slate-600 leading-relaxed">{edital.documentos || "Não informado"}</p>
            )}
          </section>
        </div>

        {editable && (
          <DialogFooter className="mt-10 pt-6 border-t border-slate-100 gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold text-slate-500">
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-blue-100">
              Salvar Alteração
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditalDetailsDialog;