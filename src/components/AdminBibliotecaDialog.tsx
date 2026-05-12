"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  Plus, 
  Pencil, 
  Trash2, 
  FileText, 
  Link as LinkIcon, 
  Upload, 
  Loader2, 
  X,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminBibliotecaDialogProps {
  category: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminBibliotecaDialog = ({ category, open, onOpenChange }: AdminBibliotecaDialogProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'form' | 'confirm'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    link_url: '',
    file_name: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('biblioteca')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (!error && data) setItems(data);
  };

  useEffect(() => {
    if (open) {
      fetchItems();
      setView('list');
    }
  }, [open, category]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file_name: e.target.files![0].name }));
    }
  };

  const handlePreSave = () => {
    if (!formData.title) {
      toast.error("O título é obrigatório.");
      return;
    }
    setView('confirm');
  };

  const handleFinalSave = async () => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        category,
        link_url: formData.link_url || null,
        file_name: formData.file_name || null
      };

      if (editingId) {
        const { error } = await supabase
          .from('biblioteca')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
        toast.success("Item atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from('biblioteca')
          .insert(payload);
        if (error) throw error;
        toast.success("Item publicado com sucesso!");
      }
      
      resetForm();
      await fetchItems();
      setView('list');
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar as alterações.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este item permanentemente?")) return;
    
    const { error } = await supabase.from('biblioteca').delete().eq('id', id);
    if (!error) {
      toast.success("Item removido.");
      fetchItems();
    } else {
      toast.error("Erro ao excluir.");
    }
  };

  const resetForm = () => {
    setFormData({ title: '', link_url: '', file_name: '' });
    setEditingId(null);
  };

  const startEdit = (item: any) => {
    setFormData({
      title: item.title,
      link_url: item.link_url || '',
      file_name: item.file_name || ''
    });
    setEditingId(item.id);
    setView('form');
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) resetForm();
    }}>
      <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-white p-8">
          <DialogHeader className="mb-8 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              {(view === 'form' || view === 'confirm') && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setView(view === 'confirm' ? 'form' : 'list')}
                  className="rounded-full hover:bg-slate-100"
                >
                  <ArrowLeft size={20} />
                </Button>
              )}
              <DialogTitle className="text-2xl font-bold text-slate-900">
                {view === 'list' ? `Gerenciar: ${category}` : 
                 view === 'confirm' ? 'Confirmar Publicação' :
                 editingId ? 'Editar Item' : 'Adicionar Novo Item'}
              </DialogTitle>
            </div>
            {view === 'list' && (
              <Button 
                onClick={() => { resetForm(); setView('form'); }} 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex gap-2 shadow-lg shadow-blue-100"
              >
                <Plus size={18} /> Adicionar
              </Button>
            )}
          </DialogHeader>

          {view === 'list' && (
            <div className="space-y-4 min-h-[300px]">
              {items.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                    <FileText size={32} />
                  </div>
                  <p className="text-slate-400 font-bold">Nenhum item publicado</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                          {item.link_url ? <LinkIcon size={20} /> : <FileText size={20} />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-bold text-slate-900 truncate leading-tight">{item.title}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                            {item.link_url ? 'Link Externo' : item.file_name || 'Arquivo Anexado'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(item)} className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white shadow-sm">
                          <Pencil size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-600 hover:bg-white shadow-sm">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'form' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título do Documento</Label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Manual do Artista 2026" 
                    className="h-14 rounded-xl border-slate-200 text-lg font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Link Externo</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <Input 
                        value={formData.link_url} 
                        onChange={(e) => setFormData({...formData, link_url: e.target.value})}
                        placeholder="https://..." 
                        className="h-14 rounded-xl border-slate-200 pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arquivo Anexado</Label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`h-14 rounded-xl border-2 border-dashed flex items-center justify-between px-4 cursor-pointer transition-all ${
                        formData.file_name ? 'border-blue-200 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                      }`}
                    >
                      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                      <div className="flex items-center gap-3 min-w-0">
                        <Upload size={18} className={formData.file_name ? 'text-blue-600' : 'text-slate-400'} />
                        <span className={`text-sm truncate ${formData.file_name ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
                          {formData.file_name || "Clique para upar"}
                        </span>
                      </div>
                      {formData.file_name && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFormData({...formData, file_name: ''}); }} 
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handlePreSave} 
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100"
              >
                {editingId ? "Salvar Alterações" : "Adicionar Item"}
              </Button>
            </div>
          )}

          {view === 'confirm' && (
            <div className="text-center py-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirmar e Publicar?</h2>
              <p className="text-slate-500 font-medium mb-10">
                Este item ficará visível imediatamente na página pública da Biblioteca para todos os usuários.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleFinalSave} 
                  disabled={loading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Confirmar e Publicar"}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setView('form')} 
                  className="w-full h-12 rounded-xl font-bold text-slate-500"
                >
                  Voltar e Editar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBibliotecaDialog;