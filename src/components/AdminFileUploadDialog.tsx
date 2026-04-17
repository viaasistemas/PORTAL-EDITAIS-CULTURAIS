"use client";

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Upload, FileText, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminFileUploadDialogProps {
  title: string;
  type: 'Resultados' | 'Anexos';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editalTitle: string;
}

const AdminFileUploadDialog = ({ title, type, open, onOpenChange, editalTitle }: AdminFileUploadDialogProps) => {
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(2) + ' MB'
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublishClick = () => {
    setShowConfirm(true);
  };

  const handleFinalConfirm = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(`${type} publicados com sucesso no portal público!`);
      setShowConfirm(false);
      onOpenChange(false);
      setFiles([]);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) {
        setShowConfirm(false);
        setFiles([]);
      }
    }}>
      <DialogContent className="max-w-md rounded-[2.5rem] p-8">
        {!showConfirm ? (
          <>
            <DialogHeader className="mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <Upload size={24} />
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900">{title}</DialogTitle>
              <p className="text-slate-500 text-sm font-medium mt-1 truncate">Edital: {editalTitle}</p>
            </DialogHeader>

            <div className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer relative group"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <Upload className="mx-auto text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" size={32} />
                <p className="text-sm font-bold text-slate-600">Clique ou arraste arquivos</p>
                <p className="text-xs text-slate-400 mt-1">PDF, DOCX ou Imagens (Máx. 10MB)</p>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <FileText size={18} className="text-blue-600 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate break-all" title={file.name}>{file.name}</p>
                          <p className="text-[10px] text-slate-400">{file.size}</p>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="text-slate-400 hover:text-red-500 transition-colors shrink-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="mt-8 gap-3">
              <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold text-slate-500">Cancelar</Button>
              <Button 
                onClick={handlePublishClick} 
                disabled={files.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-blue-100"
              >
                Publicar no Portal
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirmar Publicação?</h2>
            <p className="text-slate-500 font-medium mb-10">
              Os arquivos selecionados ficarão visíveis para todos os usuários no portal público.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleFinalConfirm} 
                disabled={uploading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100"
              >
                {uploading ? <Loader2 className="animate-spin" /> : "Confirmar e Publicar"}
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
  );
};

export default AdminFileUploadDialog;