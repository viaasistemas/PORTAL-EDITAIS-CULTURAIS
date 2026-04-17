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
import { Upload, FileText, Trash2, Loader2 } from 'lucide-react';
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

  const handleSave = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(`${type} atualizados com sucesso para o edital público!`);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] p-8">
        <DialogHeader className="mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <Upload size={24} />
          </div>
          <DialogTitle className="text-2xl font-bold text-slate-900">{title}</DialogTitle>
          <p className="text-slate-500 text-sm font-medium mt-1">Edital: {editalTitle}</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer relative">
            <Input 
              type="file" 
              multiple 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
            />
            <Upload className="mx-auto text-slate-400 mb-2" size={32} />
            <p className="text-sm font-bold text-slate-600">Clique ou arraste arquivos</p>
            <p className="text-xs text-slate-400 mt-1">PDF, DOCX ou Imagens (Máx. 10MB)</p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText size={18} className="text-blue-600 shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400">{file.size}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500 transition-colors">
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
            onClick={handleSave} 
            disabled={uploading || files.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-blue-100"
          >
            {uploading ? <Loader2 className="animate-spin" /> : "Publicar no Portal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFileUploadDialog;