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
import { Plus, Pencil, Trash2, ArrowLeft, FilePlus, FileEdit } from 'lucide-react';
import { toast } from 'sonner';
import { editaisData, EditalDetail } from '@/data/editais';

interface AdminEditaisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ViewState = 'menu' | 'add' | 'edit';

const AdminEditaisDialog = ({ open, onOpenChange }: AdminEditaisDialogProps) => {
  const [view, setView] = useState<ViewState>('menu');
  const [editais, setEditais] = useState<EditalDetail[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    number: '',
    tipo: 'PNAB' as 'PNAB' | 'LPG' | 'FM',
    vagas: '10',
    valorTotal: 'R$ 100.000,00',
    valorMaximo: 'R$ 10.000,00',
    categories: 'Cultura Popular'
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setView('menu');
      const saved = localStorage.getItem('admin_editais_list');
      if (saved) {
        setEditais(JSON.parse(saved));
      } else {
        setEditais(editaisData);
        localStorage.setItem('admin_editais_list', JSON.stringify(editaisData));
      }
    }
  }, [open]);

  const saveEditais = (updated: EditalDetail[]) => {
    setEditais(updated);
    localStorage.setItem('admin_editais_list', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.number) {
      toast.error("Título e Número são obrigatórios.");
      return;
    }

    if (editingId) {
      const updated = editais.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            title: formData.title,
            subtitle: formData.subtitle,
            number: formData.number,
            tipo: formData.tipo,
            vagas: formData.vagas,
            valorTotal: formData.valorTotal,
            valorMaximo: formData.valorMaximo,
            categories: [formData.categories]
          };
        }
        return item;
      });
      saveEditais(updated);
      toast.success("Edital atualizado com sucesso!");
    } else {
      const newEdital: EditalDetail = {
        id: formData.number,
        number: formData.number,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.subtitle,
        categories: [formData.categories],
        valorTotal: formData.valorTotal,
        valorMaximo: formData.valorMaximo,
        inicioInscricao: new Date().toLocaleDateString('pt-BR'),
        terminoInscricao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        status: 'Aberto',
        tipo: formData.tipo,
        prazoAtual: 'PERÍODO DE INSCRIÇÃO',
        vagas: formData.vagas,
        etapas: ["1. Inscrição online", "2. Análise documental", "3. Avaliação técnica", "4. Resultado final"],
        requisitos: "Ser maior de 18 anos, residir no município.",
        documentos: "RG, CPF, Comprovante de residência."
      };
      saveEditais([...editais, newEdital]);
      toast.success("Edital criado com sucesso!");
    }

    setView('menu');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      number: '',
      tipo: 'PNAB',
      vagas: '10',
      valorTotal: 'R$ 100.000,00',
      valorMaximo: 'R$ 10.000,00',
      categories: 'Cultura Popular'
    });
    setEditingId(null);
  };

  const startEdit = (item: EditalDetail) => {
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      number: item.number,
      tipo: item.tipo,
      vagas: item.vagas,
      valorTotal: item.valorTotal,
      valorMaximo: item.valorMaximo,
      categories: item.categories[0] || 'Cultura Popular'
    });
    setEditingId(item.id);
    setView('add');
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este edital?")) {
      const updated = editais.filter(item => item.id !== id);
      saveEditais(updated);
      toast.success("Edital excluído com sucesso!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3">
            {view !== 'menu' && (
              <Button variant="ghost" size="icon" onClick={() => setView('menu')} className="rounded-full h-8 w-8">
                <ArrowLeft size={16} />
              </Button>
            )}
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {view === 'menu' && "Gerenciar Editais"}
              {view === 'add' && (editingId ? "Editar Edital" : "Adicionar Edital")}
              {view === 'edit' && "Editar Editais"}
            </DialogTitle>
          </div>
        </DialogHeader>

        {view === 'menu' && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <button
              onClick={() => { resetForm(); setView('add'); }}
              className="flex items-center gap-4 p-6 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FilePlus size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Adicionar Novo</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Criar um novo edital público</p>
              </div>
            </button>

            <button
              onClick={() => setView('edit')}
              className="flex items-center gap-4 p-6 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FileEdit size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Editar Existentes</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Alterar ou remover editais atuais</p>
              </div>
            </button>
          </div>
        )}

        {view === 'add' && (
          <form onSubmit={handleSave} className="space-y-5 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Número do Edital</Label>
                <Input name="number" value={formData.number} onChange={handleInputChange} placeholder="Ex: 042026" className="h-11 rounded-xl border-slate-200" required />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(val: any) => setFormData({...formData, tipo: val})}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="PNAB">PNAB</SelectItem>
                    <SelectItem value="LPG">LPG</SelectItem>
                    <SelectItem value="FM">Fomento Municipal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título do Edital</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: PNAB - Fomento à Literatura" className="h-11 rounded-xl border-slate-200" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtítulo / Resumo</Label>
              <Input name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="Ex: Apoio a escritores e poetas locais" className="h-11 rounded-xl border-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vagas</Label>
                <Input name="vagas" value={formData.vagas} onChange={handleInputChange} placeholder="Ex: 15" className="h-11 rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categoria Principal</Label>
                <Input name="categories" value={formData.categories} onChange={handleInputChange} placeholder="Ex: Literatura" className="h-11 rounded-xl border-slate-200" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Valor Total</Label>
                <Input name="valorTotal" value={formData.valorTotal} onChange={handleInputChange} placeholder="Ex: R$ 100.000,00" className="h-11 rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Valor Máximo por Projeto</Label>
                <Input name="valorMaximo" value={formData.valorMaximo} onChange={handleInputChange} placeholder="Ex: R$ 10.000,00" className="h-11 rounded-xl border-slate-200" />
              </div>
            </div>

            <DialogFooter className="gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => setView('menu')} className="rounded-xl font-bold text-slate-500">Voltar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold">Salvar Edital</Button>
            </DialogFooter>
          </form>
        )}

        {view === 'edit' && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 py-2">
            {editais.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 text-sm truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">#{item.number} • {item.tipo}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => startEdit(item)}
                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white"
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditaisDialog;