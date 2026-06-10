"use client";

import React, { useState, useEffect } from 'react';
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
import { Plus, Pencil, Trash2, ArrowLeft, FolderPlus, FolderEdit, Check } from 'lucide-react';
import { toast } from 'sonner';

interface AdminCategoriasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ViewState = 'menu' | 'add' | 'edit';

const AdminCategoriasDialog = ({ open, onOpenChange }: AdminCategoriasDialogProps) => {
  const [view, setView] = useState<ViewState>('menu');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    if (open) {
      setView('menu');
      const saved = localStorage.getItem('admin_categories');
      if (saved) {
        setCategories(JSON.parse(saved));
      } else {
        const defaultCats = ["Cultura Popular", "Música", "Dança", "Artes Visuais", "Artes Cênicas", "Audiovisual", "Literatura", "Artesanato"];
        setCategories(defaultCats);
        localStorage.setItem('admin_categories', JSON.stringify(defaultCats));
      }
    }
  }, [open]);

  const saveCategories = (updated: string[]) => {
    setCategories(updated);
    localStorage.setItem('admin_categories', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      toast.error("O nome da categoria não pode ser vazio.");
      return;
    }
    if (categories.includes(newCategory.trim())) {
      toast.error("Esta categoria já existe.");
      return;
    }
    const updated = [...categories, newCategory.trim()];
    saveCategories(updated);
    toast.success("Categoria adicionada com sucesso!");
    setNewCategory('');
    setView('menu');
  };

  const handleEditSave = (index: number) => {
    if (!editingValue.trim()) {
      toast.error("O nome da categoria não pode ser vazio.");
      return;
    }
    const updated = [...categories];
    updated[index] = editingValue.trim();
    saveCategories(updated);
    toast.success("Categoria atualizada com sucesso!");
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      const updated = categories.filter((_, i) => i !== index);
      saveCategories(updated);
      toast.success("Categoria excluída com sucesso!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] p-8">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3">
            {view !== 'menu' && (
              <Button variant="ghost" size="icon" onClick={() => setView('menu')} className="rounded-full h-8 w-8">
                <ArrowLeft size={16} />
              </Button>
            )}
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {view === 'menu' && "Gerenciar Categorias"}
              {view === 'add' && "Adicionar Categoria"}
              {view === 'edit' && "Editar Categorias"}
            </DialogTitle>
          </div>
        </DialogHeader>

        {view === 'menu' && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <button
              onClick={() => setView('add')}
              className="flex items-center gap-4 p-6 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FolderPlus size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Adicionar Nova</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Criar uma nova categoria de edital</p>
              </div>
            </button>

            <button
              onClick={() => setView('edit')}
              className="flex items-center gap-4 p-6 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FolderEdit size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Editar Existentes</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Alterar ou remover categorias atuais</p>
              </div>
            </button>
          </div>
        )}

        {view === 'add' && (
          <form onSubmit={handleAdd} className="space-y-6 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome da Categoria</Label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Ex: Artes Visuais"
                className="h-12 rounded-xl border-slate-200"
                required
                autoFocus
              />
            </div>
            <DialogFooter className="gap-3">
              <Button type="button" variant="ghost" onClick={() => setView('menu')} className="rounded-xl font-bold text-slate-500">Voltar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold">Salvar Categoria</Button>
            </DialogFooter>
          </form>
        )}

        {view === 'edit' && (
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 py-2">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3">
                {editingIndex === index ? (
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="h-9 rounded-lg border-slate-200 flex-grow"
                      autoFocus
                    />
                    <Button size="icon" onClick={() => handleEditSave(index)} className="h-9 w-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shrink-0">
                      <Check size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditingIndex(null)} className="h-9 w-9 rounded-lg shrink-0 text-slate-400">
                      <ArrowLeft size={16} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-slate-800 text-sm">{cat}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingIndex(index);
                          setEditingValue(cat);
                        }}
                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(index)}
                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminCategoriasDialog;