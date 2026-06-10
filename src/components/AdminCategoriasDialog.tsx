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
  Plus, 
  Pencil, 
  Trash2, 
  ArrowLeft, 
  FolderPlus, 
  FolderEdit, 
  Check,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminCategoriasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ProgramType = 'FM' | 'LPG' | 'PNAB';
type ViewState = 'menu' | 'add_select_program' | 'add_form' | 'edit_select_program' | 'edit_list';

interface ProgramCategories {
  FM: string[];
  LPG: string[];
  PNAB: string[];
}

const defaultCategories: ProgramCategories = {
  FM: ["Patrimônio", "Artesanato", "Cultura Popular"],
  LPG: ["Audiovisual", "Artes Cênicas", "Música"],
  PNAB: ["Cultura Popular", "Música", "Dança", "Artes Visuais", "Artes Cênicas", "Audiovisual", "Literatura", "Artesanato"]
};

const AdminCategoriasDialog = ({ open, onOpenChange }: AdminCategoriasDialogProps) => {
  const [view, setView] = useState<ViewState>('menu');
  const [categories, setCategories] = useState<ProgramCategories>(defaultCategories);
  const [selectedProgram, setSelectedProgram] = useState<ProgramType>('PNAB');
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    if (open) {
      setView('menu');
      const saved = localStorage.getItem('admin_categories_by_program');
      if (saved) {
        setCategories(JSON.parse(saved));
      } else {
        setCategories(defaultCategories);
        localStorage.setItem('admin_categories_by_program', JSON.stringify(defaultCategories));
      }
    }
  }, [open]);

  const saveCategories = (updated: ProgramCategories) => {
    setCategories(updated);
    localStorage.setItem('admin_categories_by_program', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newCategoryTitle.trim();
    if (!title) {
      toast.error("O título da categoria não pode ser vazio.");
      return;
    }

    const programList = categories[selectedProgram] || [];
    if (programList.some(cat => cat.toLowerCase() === title.toLowerCase())) {
      toast.error("Esta categoria já existe neste programa.");
      return;
    }

    const updated = {
      ...categories,
      [selectedProgram]: [...programList, title]
    };

    saveCategories(updated);
    toast.success(`Categoria "${title}" adicionada ao programa com sucesso!`);
    setNewCategoryTitle('');
    setView('menu');
  };

  const handleEditSave = (index: number) => {
    const title = editingValue.trim();
    if (!title) {
      toast.error("O título da categoria não pode ser vazio.");
      return;
    }

    const programList = [...categories[selectedProgram]];
    programList[index] = title;

    const updated = {
      ...categories,
      [selectedProgram]: programList
    };

    saveCategories(updated);
    toast.success("Categoria atualizada com sucesso!");
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      const programList = categories[selectedProgram].filter((_, i) => i !== index);
      const updated = {
        ...categories,
        [selectedProgram]: programList
      };
      saveCategories(updated);
      toast.success("Categoria excluída com sucesso!");
    }
  };

  const getProgramLabel = (prog: ProgramType) => {
    if (prog === 'FM') return 'Fomento Municipal';
    if (prog === 'LPG') return 'Lei Paulo Gustavo';
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
                  if (view === 'add_form') setView('add_select_program');
                  else if (view === 'edit_list') setView('edit_select_program');
                  else setView('menu');
                }} 
                className="rounded-full h-8 w-8"
              >
                <ArrowLeft size={16} />
              </Button>
            )}
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {view === 'menu' && "Gerenciar Categorias"}
              {view === 'add_select_program' && "Selecionar Programa"}
              {view === 'add_form' && "Adicionar Categoria"}
              {view === 'edit_select_program' && "Selecionar Programa para Editar"}
              {view === 'edit_list' && `Editar: ${getProgramLabel(selectedProgram)}`}
            </DialogTitle>
          </div>
        </DialogHeader>

        {view === 'menu' && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <button
              onClick={() => setView('add_select_program')}
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
              onClick={() => setView('edit_select_program')}
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

        {(view === 'add_select_program' || view === 'edit_select_program') && (
          <div className="space-y-3 py-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Escolha o Programa:</p>
            {(['FM', 'LPG', 'PNAB'] as ProgramType[]).map((prog) => (
              <button
                key={prog}
                onClick={() => {
                  setSelectedProgram(prog);
                  setView(view === 'add_select_program' ? 'add_form' : 'edit_list');
                }}
                className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-xl transition-all text-left font-bold text-slate-800"
              >
                <span>{getProgramLabel(prog)}</span>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {view === 'add_form' && (
          <form onSubmit={handleAddCategory} className="space-y-6 py-2">
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Programa Selecionado</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{getProgramLabel(selectedProgram)}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título da Categoria</Label>
              <Input
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
                placeholder="Ex: Artes Visuais, Dança, Teatro..."
                className="h-12 rounded-xl border-slate-200"
                required
                autoFocus
              />
            </div>
            <DialogFooter className="gap-3">
              <Button type="button" variant="ghost" onClick={() => setView('add_select_program')} className="rounded-xl font-bold text-slate-500">Voltar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold">Confirmar</Button>
            </DialogFooter>
          </form>
        )}

        {view === 'edit_list' && (
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 py-2">
            {(categories[selectedProgram] || []).map((cat, index) => (
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
            {(categories[selectedProgram] || []).length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">Nenhuma categoria cadastrada neste programa.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminCategoriasDialog;