"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EditalDetail } from '@/data/editais';

interface EditalDetailsDialogProps {
  edital: EditalDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditalDetailsDialog = ({ edital, open, onOpenChange }: EditalDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8">
        <DialogHeader className="mb-6">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Detalhes do Edital</p>
          <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">{edital.title}</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium mt-2">
            {edital.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Descrição</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{edital.description}</p>
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Categorias</h4>
            <div className="flex flex-wrap gap-2">
              {edital.categories.map((cat, i) => (
                <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg px-3 py-1">
                  {cat}
                </Badge>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-8">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Total</h4>
              <p className="text-lg font-bold text-blue-600">{edital.valorTotal}</p>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Máximo por Projeto</h4>
              <p className="text-lg font-bold text-blue-600">{edital.valorMaximo}</p>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Início da Inscrição</h4>
              <p className="text-sm font-bold text-slate-700">{edital.inicioInscricao}</p>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Término da Inscrição</h4>
              <p className="text-sm font-bold text-slate-700">{edital.terminoInscricao}</p>
            </section>
          </div>

          <Separator className="bg-slate-100" />

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Etapas do Processo</h4>
            <ul className="space-y-2">
              {edital.etapas.map((etapa, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  {etapa}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requisitos</h4>
            <p className="text-sm text-slate-600">{edital.requisitos}</p>
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Documentos Necessários</h4>
            <p className="text-sm text-slate-600">{edital.documentos}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditalDetailsDialog;