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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, ArrowLeft, FolderPlus, FolderEdit, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CategoryItem {
  title: string;
  type: 'FM' | 'LPG' | 'PNAB';
}

interface AdminCategoriasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ViewState = 'menu' | 'add-select-type' | 'add-input-title' | 'edit-select-type' | 'edit-list';

const AdminCategoriasDialog = ({ open, onOpenChange }: AdminCategoriasDialogProps) => {
  const [view, setView] = useState<ViewState>('menu');
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedType, setSelectedType] = useState<'FM' | 'LPG' | 'PNAB'>('PNAB');
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    if (open) {
      setView('menu');
      const saved = localStorage.getItem('admin_categories');
      if (saved) {
        setCategories(JSON.parse(saved));
      } else {
        const defaultCats: CategoryItem[] = [
          { title: "Cultura Popular", type: "PNAB" },
          { title: "Música", type: "PNAB" },
          { title: "Dança", type: "PNAB" },
          { title: "Artes Visuais", type: "FM" },
          { title: "Artes Cênicas", type: "FM" },
          { title: "Audiovisual", type: "LPG" },
          { title: "Literatura", type: "FM" },
          { title: "Artesanato", type: "FM" }
        ];
        setCategories(defaultCats);
        localStorage.setItem('admin_categories', JSON.stringify(defaultCats));
      }
    }
  }, [open]);

  const saveCategories = (updated: CategoryItem[]) => {
    setCategories(updated);
    localStorage.setItem('admin_categories', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) {
      toast.error("O nome da categoria não pode ser vazio.");
      return;
    }

    const exists = categories.some(
      cat => cat.title.toLowerCase() === newCategoryTitle.trim().toLowerCase() && cat.type === selectedType
    );

    if (exists) {
      toast.error("Esta categoria já existe neste programa.");
      return;
    }

    const updated = [...categories, { title: newCategoryTitle.trim(), type: selectedType }];
    saveCategories(updated);
    toast.success("Categoria adicionada com sucesso!");
    setNewCategoryTitle('');
    setView('menu');
  };

  const handleEditSave = (globalIndex: number) => {
    if (!editingValue.trim()) {
      toast.error("O nome da categoria não pode ser vazio.");
      return;
    }
    const updated = [...categories];
    updated[globalIndex].title = editingValue.trim();
    saveCategories(updated);
    toast.success("Categoria atualizada com sucesso!");
    setEditingIndex(null);
  };

  const handleDelete = (globalIndex: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      const updated = categories.filter((_, i) => i !== globalIndex);
      saveCategories(updated);
      toast.success("Categoria excluída com sucesso!");
    }
  };

  const getTypeName = (type: 'FM' | 'LPG' | 'PNAB') => {
    if (type === 'FM') return 'Fomento Municipal';
    if (type === 'LPG') return 'Lei Paulo Gustavo';
    return 'PNAB';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] p-8">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3">
            {view !== 'menu' && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  if (view === 'add-input-title') setView('add-select-type');
                  else if (view === 'edit-list') setView('edit-select-type');
                  else setView('menu');
                }} 
                className="rounded-full h-8 w-8"
              >
                <ArrowLeft size={16} />
              </Button>
            )}
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {view === 'menu' && "Gerenciar Categorias"}
              {view === 'add-select-type' && "Selecionar Programa"}
              {view === 'add-input-title' && "Adicionar Categoria"}
              {view === 'edit-select-type' && "Selecionar Programa"}
              {view === 'edit-list' && `Editar: ${getTypeName(selectedType)}`}
            </DialogTitle>
          </div>
        </DialogHeader>

        {view === 'menu' && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <button
              onClick={() => setView('add-select-type')}
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
              onClick={() => setView('edit-select-type')}
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

        {view === 'add-select-type' && (
          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selecione o Programa</Label>
              <Select 
                value={selectedType} 
                onValueChange={(val: 'FM' | 'LPG' | 'PNAB') => setSelectedType(val)}
              >
                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                  <SelectValue placeholder="Selecione o programa" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="FM">Fomento Municipal</SelectItem>
                  <SelectItem value="LPG">Lei Paulo Gustavo</SelectItem>
                  <SelectItem value="PNAB">PNAB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => setView('add-input-title')} 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
            >
              Avançar
            </Button>
          </div>
        )}

        {view === 'add-input-title' && (
          <form onSubmit={handleAddConfirm} className="space-y-6 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Programa Selecionado</Label>
              <p className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100">
                {getTypeName(selectedType)}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título da Categoria</Label>
              <Input
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
                placeholder="Ex: Artes Visuais"
                className="h-12 rounded-xl border-slate-200"
                required
                autoFocus
              />
            </div>
            <DialogFooter className="gap-3">
              <Button type="button" variant="ghost" onClick={() => setView('add-select-type')} className="rounded-xl font-bold text-slate-500">Voltar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold">Confirmar</Button>
            </DialogFooter>
          </form>
        )}

        {view === 'edit-select-type' && (
          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selecione o Programa</Label>
              <Select 
                value={selectedType} 
                onValueChange={(val: 'FM' | 'LPG' | 'PNAB') => setSelectedType(val)}
              >
                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                  <SelectValue placeholder="Selecione o programa" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="FM">Fomento Municipal</SelectItem>
                  <SelectItem value="LPG">Lei Paulo Gustavo</SelectItem>
                  <SelectItem value="PNAB">PNAB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => setView('edit-list')} 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
            >
              Avançar
            </Button>
          </div>
        )}

        {view === 'edit-list' && (
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 py-2">
            {categories.filter(cat => cat.type === selectedType).length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center gap-2">
                <AlertCircle className="text-slate-300" size={24} />
                <p className="text-slate-400 font-bold text-sm">Nenhuma categoria cadastrada</p>
              </div>
            ) : (
              categories.map((cat, globalIndex) => {
                if (cat.type !== selectedType) return null;
                
                return (
                  <div key={globalIndex} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3">
                    {editingIndex === globalIndex ? (
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="h-9 rounded-lg border-slate-200 flex-grow"
                          autoFocus
                        />
                        <Button size="icon" onClick={() => handleEditSave(globalIndex)} className="h-9 w-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shrink-0">
                          <Check size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setEditingIndex(null)} className="h-9 w-9 rounded-lg shrink-0 text-slate-400">
                          <ArrowLeft size={16} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="font-bold text-slate-800 text-sm">{cat.title}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditingIndex(globalIndex);
                              setEditingValue(cat.title);
                            }}
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(globalIndex)}
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminCategoriasDialog;