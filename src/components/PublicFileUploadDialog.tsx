"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Download, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileItem {
  name: string;
  size: string;
  url: string;
}

interface PublicFileUploadDialogProps {
  title: string;
  type: 'Anexos' | 'Resultados';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editalTitle: string;
  files?: FileItem[];
}

const PublicFileUploadDialog = ({ title, type, open, onOpenChange, editalTitle, files = [] }: PublicFileUploadDialogProps) => {
  const isEmpty = files.length === 0;
  const emptyMessage = type === 'Anexos' ? 'Nenhum Anexo' : 'Resultado em Breve';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-[2.5rem] p-8">
        <DialogHeader className="mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${type === 'Anexos' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
            <FileText size={24} />
          </div>
          <DialogTitle className="text-2xl font-bold text-slate-900">{title}</DialogTitle>
          <p className="text-slate-500 text-sm font-medium mt-1 truncate">Edital: {editalTitle}</p>
        </DialogHeader>

        <div className="space-y-4">
          {isEmpty ? (
            <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              {type === 'Anexos' ? (
                <AlertCircle className="mx-auto text-slate-300 mb-3" size={40} />
              ) : (
                <Clock className="mx-auto text-slate-300 mb-3" size={40} />
              )}
              <p className="text-slate-500 font-bold text-lg">{emptyMessage}</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate leading-tight">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{file.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-white flex gap-2 font-bold">
                    <Download size={16} /> Baixar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <Button onClick={() => onOpenChange(false)} className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-lg">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublicFileUploadDialog;