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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, ArrowLeft, FilePlus, FileEdit, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { editaisData, EditalDetail } from '@/data/editais';

interface AdminEditaisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ProgramType = 'FM' | 'LPG' | 'PNAB';
type ViewState = 
  | 'menu' 
  | 'add_select_program' 
  | 'add_form' 
  | 'edit_select_program' 
  | 'edit_list';

const defaultCategories = {
  FM: ["Patrimônio", "Artesanato", "Cultura Popular"],
  LPG: ["Audiovisual", "Artes Cênicas", "Música"],
  PNAB: ["Cultura Popular", "Música", "Dança", "Artes Visuais", "Artes Cênicas", "Audiovisual", "Literatura", "Artesanato"]
};

const AdminEditaisDialog = ({ open, onOpenChange }: AdminEditaisDialogProps) => {
  const [view, setView] = useState<ViewState>('menu');
  const [editais, setEditais] = useState<EditalDetail[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramType>('PNAB');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    valorTotal: '',
    valorMaximo: '',
    vagas: '',
    etapas: '',
    requisitos: '',
    documentos: '',
    maxInscricoes: '0',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setView('menu');
      
      const savedEditais = localStorage.getItem('admin_editais_list');
      if (savedEditais) {
        setEditais(JSON.parse(savedEditais));
      } else {
        setEditais(editaisData);
        localStorage.setItem('admin_editais_list', JSON.stringify(editaisData));
      }
    }
  }, [open]);

  useEffect(() => {
    const savedCats = localStorage.getItem('admin_categories_by_program');
    const cats = savedCats ? JSON.parse(savedCats) : defaultCategories;
    const programCats = cats[selectedProgram] || [];
    setAvailableCategories(programCats);
    
    // Reseta a categoria selecionada se ela não estiver nas disponíveis do novo fomento
    if (!programCats.includes(formData.category)) {
      setFormData(prev => ({ ...prev, category: '' }));
    }
  }, [selectedProgram, formData.category]);

  const saveEditais = (updated: EditalDetail[]) => {
    setEditais(updated);
    localStorage.setItem('admin_editais_list', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateEditalNumber = () => {
    const currentYear = new Date().getFullYear();
    const yearStr = String(currentYear);
    const editaisThisYear = editais.filter(e => e.number.endsWith(yearStr));
    const nextSeq = editaisThisYear.length + 1;
    const seqStr = String(nextSeq).padStart(2, '0');
    return `${seqStr}${currentYear}`;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle || !formData.category) {
      toast.error("Título, Subtítulo e Categoria são obrigatórios.");
      return;
    }

    const etapasArray = formData.etapas 
      ? formData.etapas.split('\n').filter(line => line.trim() !== '')
      : [];

    if (editingId) {
      const updated = editais.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            tipo: selectedProgram,
            vagas: formData.vagas,
            valorTotal: formData.valorTotal,
            valorMaximo: formData.valorMaximo,
            categories: [formData.category],
            etapas: etapasArray,
            requisitos: formData.requisitos,
            documentos: formData.documentos,
            maxInscricoes: Number(formData.maxInscricoes) || 0
          };
        }
        return item;
      });
      saveEditais(updated);
      toast.success("Edital atualizado com sucesso!");
    } else {
      const generatedNumber = generateEditalNumber();
      const newEdital: EditalDetail = {
        id: generatedNumber,
        number: generatedNumber,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        categories: [formData.category],
        valorTotal: formData.valorTotal,
        valorMaximo: formData.valorMaximo,
        inicioInscricao: new Date().toLocaleDateString('pt-BR'),
        terminoInscricao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        status: 'Aberto',
        tipo: selectedProgram,
        prazoAtual: 'PERÍODO DE INSCRIÇÃO',
        vagas: formData.vagas,
        etapas: etapasArray,
        requisitos: formData.requisitos,
        documentos: formData.documentos,
        createdAt: new Date().toISOString(),
        maxInscricoes: Number(formData.maxInscricoes) || 0
      };

      // Inicializa as configurações do edital com a visibilidade desativada por padrão
      const settingsKey = `edital_settings_${generatedNumber}`;
      const initialSettings = {
        isVisible: false, // Chave de visibilidade desligada por padrão
        isFinalized: false,
        isProrrogacao: false,
        isRecurso: false,
        isDocumentacao: false,
        dates: {
          abertura: '',
          horaAbertura: '08:00',
          encerramento: '',
          horaEncerramento: '23:59',
          prorrogacaoInicio: '',
          prorrogacaoHoraInicio: '08:00',
          prorrogacaoFim: '',
          prorrogacaoHoraFim: '23:59',
          recursoInicio: '',
          recursoHoraInicio: '08:00',
          recursoFim: '',
          recursoHoraFim: '23:59',
          docInicio: '',
          docHoraInicio: '08:00',
          docFim: '',
          docHoraFim: '23:59',
        }
      };
      localStorage.setItem(settingsKey, JSON.stringify(initialSettings));

      saveEditais([...editais, newEdital]);
      toast.success(`Edital #${generatedNumber} criado com sucesso!`);
    }

    setView('menu');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      category: '',
      valorTotal: '',
      valorMaximo: '',
      vagas: '',
      etapas: '',
      requisitos: '',
      documentos: '',
      maxInscricoes: '0',
    });
    setEditingId(null);
  };

  const startEdit = (item: EditalDetail) => {
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description || '',
      category: item.categories[0] || '',
      valorTotal: item.valorTotal || '',
      valorMaximo: item.valorMaximo || '',
      vagas: item.vagas || '',
      etapas: item.etapas ? item.etapas.join('\n') : '',
      requisitos: item.requisitos || '',
      documentos: item.documentos || '',
      maxInscricoes: String(item.maxInscricoes || 0),
    });
    setSelectedProgram(item.tipo);
    setEditingId(item.id);
    setView('add_form');
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este edital?")) {
      const updated = editais.filter(item => item.id !== id);
      saveEditais(updated);
      toast.success("Edital excluído com sucesso!");
    }
  };

  const getProgramLabel = (prog: ProgramType) => {
    if (prog === 'FM') return 'Fomento Municipal';
    if (prog === 'LPG') return 'Lei Paulo Gustavo';
    return 'PNAB';
  };

  const handleBack = () => {
    if (view === 'add_select_program') setView('menu');
    else if (view === 'add_form') {
      if (editingId) setView('edit_list');
      else setView('add_select_program');
    }
    else if (view === 'edit_select_program') setView('menu');
    else if (view === 'edit_list') setView('edit_select_program');
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) resetForm();
    }}>
      <DialogContent className="max-w-xl rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3">
            {view !== 'menu' && (
              <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full h-8 w-8">
                <ArrowLeft size={16} />
              </Button>
            )}
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {view === 'menu' && "Gerenciar Editais"}
              {view === 'add_select_program' && "Selecionar Fomento"}
              {view === 'add_form' && (editingId ? "Editar Edital" : "Adicionar Edital")}
              {view === 'edit_select_program' && "Selecionar Fomento"}
              {view === 'edit_list' && `Editais: ${getProgramLabel(selectedProgram)}`}
            </DialogTitle>
          </div>
        </DialogHeader>

        {view === 'menu' && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <button
              onClick={() => { resetForm(); setView('add_select_program'); }}
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
              onClick={() => setView('edit_select_program')}
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

        {(view === 'add_select_program' || view === 'edit_select_program') && (
          <div className="space-y-3 py-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Escolha o Fomento:</p>
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
          <form onSubmit={handleSave} className="space-y-5 py-2">
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">TIPO DE FOMENTO</p>
              <p className="text-xs font-bold text-slate-800 mt-1">{getProgramLabel(selectedProgram)}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Título do Edital *</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: Fomento à Literatura" className="h-11 rounded-xl border-slate-200" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtítulo / Resumo *</Label>
              <Input name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="Ex: Apoio a escritores e poetas locais" className="h-11 rounded-xl border-slate-200" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descrição</Label>
              <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Descrição detalhada do edital..." className="rounded-xl border-slate-200 min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categoria *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vagas</Label>
                <Input name="vagas" value={formData.vagas} onChange={handleInputChange} placeholder="Ex: 15" className="h-11 rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Limite de Inscrições por CPF/CNPJ</Label>
                <Input type="number" name="maxInscricoes" value={formData.maxInscricoes} onChange={handleInputChange} placeholder="0 para ilimitado" className="h-11 rounded-xl border-slate-200" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Etapas do Processo (Uma por linha)</Label>
              <Textarea name="etapas" value={formData.etapas} onChange={handleInputChange} placeholder="Ex:&#10;1. Inscrição online&#10;2. Análise documental&#10;3. Avaliação técnica" className="rounded-xl border-slate-200 min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Requisitos</Label>
              <Textarea name="requisitos" value={formData.requisitos} onChange={handleInputChange} placeholder="Requisitos de participação..." className="rounded-xl border-slate-200 min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Documentos Necessários</Label>
              <Textarea name="documentos" value={formData.documentos} onChange={handleInputChange} placeholder="Documentos exigidos..." className="rounded-xl border-slate-200 min-h-[80px]" />
            </div>

            <DialogFooter className="gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={handleBack} className="rounded-xl font-bold text-slate-500">Voltar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold">Salvar Edital</Button>
            </DialogFooter>
          </form>
        )}

        {view === 'edit_list' && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 py-2">
            {editais.filter(item => item.tipo === selectedProgram).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 text-sm truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">#{item.number} • {item.categories[0]}</p>
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
            {editais.filter(item => item.tipo === selectedProgram).length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">Nenhum edital cadastrado neste fomento.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditaisDialog;