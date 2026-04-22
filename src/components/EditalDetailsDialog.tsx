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
        <DialogHeader className="mb-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Detalhes do Edital</p>
          <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">{edital.title}</DialogTitle>
          <DialogDescription className="text-slate-500 font-bold text-base mt-2">
            {edital.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-10">
          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Descrição</h4>
            <p className="text-base text-slate-600 leading-relaxed">{edital.description}</p>
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
              <p className="text-xl font-bold text-blue-600">{edital.valorTotal}</p>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Máximo por Projeto</h4>
              <p className="text-xl font-bold text-blue-600">{edital.valorMaximo}</p>
            </section>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Início da Inscrição</h4>
              <p className="text-base font-bold text-slate-700">{edital.inicioInscricao}</p>
            </section>
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Término da Inscrição</h4>
              <p className="text-base font-bold text-slate-700">{edital.terminoInscricao}</p>
            </section>
          </div>

          <Separator className="bg-slate-100" />

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

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requisitos</h4>
            <p className="text-base text-slate-600 leading-relaxed">{edital.requisitos}</p>
          </section>

          <section>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Documentos Necessários</h4>
            <p className="text-base text-slate-600 leading-relaxed">{edital.documentos}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditalDetailsDialog;