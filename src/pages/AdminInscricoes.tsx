"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminEditalCard from '@/components/AdminEditalCard';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editaisData, EditalDetail } from '@/data/editais';
import AdminCategoriasDialog from '@/components/AdminCategoriasDialog';
import AdminEditaisDialog from '@/components/AdminEditaisDialog';

const AdminInscricoes = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeTab, setTab] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [editalSettings, setEditalSettings] = useState<Record<string, any>>({});
  const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
  
  // Estados para controle dos diálogos
  const [isCategoriasOpen, setIsCategoriasOpen] = useState(false);
  const [isEditaisOpen, setIsEditaisOpen] = useState(false);
  const [dynamicEditais, setDynamicEditais] = useState<EditalDetail[]>(editaisData);

  const loadSettingsAndEditais = () => {
    // Carrega configurações de prazos
    const settings: Record<string, any> = {};
    editaisData.forEach(e => {
      const saved = localStorage.getItem(`edital_settings_${e.id}`);
      if (saved) settings[e.id] = JSON.parse(saved);
    });
    setEditalSettings(settings);

    // Carrega lista dinâmica de editais
    const savedEditais = localStorage.getItem('admin_editais_list');
    if (savedEditais) {
      setDynamicEditais(JSON.parse(savedEditais));
    } else {
      setDynamicEditais(editaisData);
    }

    // Carrega categorias dinâmicas
    const savedCats = localStorage.getItem('admin_categories_by_program');
    if (savedCats) {
      const parsed = JSON.parse(savedCats);
      if (activeTab === 'PNAB') setDynamicCategories(parsed.PNAB || []);
      else if (activeTab === 'LPG') setDynamicCategories(parsed.LPG || []);
      else if (activeTab === 'Fomento Municipal') setDynamicCategories(parsed.FM || []);
      else setDynamicCategories([]);
    } else {
      if (activeTab === 'PNAB') setDynamicCategories(["Cultura Popular", "Música", "Dança", "Artes Visuais", "Artes Cênicas", "Audiovisual", "Literatura", "Artesanato"]);
      else if (activeTab === 'LPG') setDynamicCategories(["Audiovisual", "Artes Cênicas", "Música"]);
      else if (activeTab === 'Fomento Municipal') setDynamicCategories(["Patrimônio", "Artesanato", "Cultura Popular"]);
      else setDynamicCategories([]);
    }
  };

  useEffect(() => {
    if (!loading && !session) navigate('/login');
    
    loadSettingsAndEditais();
    window.addEventListener('storage', loadSettingsAndEditais);
    return () => window.removeEventListener('storage', loadSettingsAndEditais);
  }, [session, loading, navigate, activeTab]);

  if (loading || !session) return null;

  const getDynamicStatus = (edital: any) => {
    const settings = editalSettings[edital.id];
    if (settings?.isFinalized) return 'Finalizado';
    
    const now = new Date();
    const endStr = settings?.dates?.encerramento && settings?.dates?.horaEncerramento 
      ? `${settings.dates.encerramento}T${settings.dates.horaEncerramento}` 
      : edital.dataEncerramento;
    
    const end = endStr ? new Date(endStr) : null;
    if (end && now > end) return 'Encerrado';
    
    const startStr = settings?.dates?.abertura && settings?.dates?.horaAbertura 
      ? `${settings.dates.abertura}T${settings.dates.horaAbertura}` 
      : edital.dataAbertura;
    const start = startStr ? new Date(startStr) : null;
    
    if (start && now < start) return 'Em breve';
    return 'Aberto';
  };

  const filteredEditais = dynamicEditais.filter(edital => {
    const currentStatus = getDynamicStatus(edital);
    const settings = editalSettings[edital.id];

    const matchesTab = activeTab === 'Todos' || 
                      (activeTab === 'Fomento Municipal' && edital.tipo === 'FM') ||
                      (activeTab === 'LPG' && edital.tipo === 'LPG') ||
                      (activeTab === 'PNAB' && edital.tipo === 'PNAB');
    
    const matchesStatus = statusFilter === 'todos' || 
                         (statusFilter === 'aberto' && currentStatus === 'Aberto') ||
                         (statusFilter === 'encerrado' && currentStatus === 'Encerrado' && !settings?.isFinalized) ||
                         (statusFilter === 'finalizado' && settings?.isFinalized);

    const matchesCategory = categoryFilter === 'todas' || 
                           edital.categories.includes(categoryFilter);

    const cleanSearch = searchTerm.toLowerCase().replace('#', '');
    const matchesSearch = edital.title.toLowerCase().includes(cleanSearch) ||
                         edital.number.includes(cleanSearch);

    return matchesTab && matchesStatus && matchesSearch && matchesCategory;
  });

  // Ordena os editais do mais novo para o mais antigo com base na data de criação
  const sortedEditais = [...filteredEditais].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : new Date(a.dataAbertura || 0).getTime();
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : new Date(b.dataAbertura || 0).getTime();
    return dateB - dateA;
  });

  const tabs = ["Todos", "Fomento Municipal", "LPG", "PNAB"];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <AdminHeader title="Gestão de Editais" />

        <div className="p-4 md:px-8 lg:px-12 w-full space-y-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Gestão de Inscrições</h2>
              <p className="text-slate-500 text-base md:text-lg font-medium mt-1">Visualizar e gerenciar as inscrições recebidas por edital</p>
            </div>
            
            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder="Buscar edital (ex: #012026)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-slate-200 bg-white"
                  />
                </div>
                
                {activeTab !== 'Todos' && dynamicCategories.length > 0 && (
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] bg-white border-slate-200 rounded-xl h-11">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="todas">Todas Categorias</SelectItem>
                      {dynamicCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-white border-slate-200 rounded-xl h-11">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="encerrado">Encerrado</SelectItem>
                    <SelectItem value="finalizado">Finalizados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsCategoriasOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 font-bold px-6 flex gap-2 shadow-lg shadow-blue-100"
                >
                  <Plus size={18} /> Categorias
                </Button>
                <Button 
                  onClick={() => setIsEditaisOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 font-bold px-6 flex gap-2 shadow-lg shadow-blue-100"
                >
                  <Plus size={18} /> Editais
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100">
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => {
                  setTab(tab);
                  setCategoryFilter('todas');
                }}
                className={`rounded-xl px-6 h-11 font-bold text-sm transition-all shrink-0 ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEditais.length > 0 ? (
              sortedEditais.map((edital) => (
                <AdminEditalCard key={edital.id} edital={edital} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Nenhum edital encontrado para este filtro.</p>
              </div>
            )}
          </div>
        </div>

        {/* Diálogos de Gerenciamento */}
        <AdminCategoriasDialog open={isCategoriasOpen} onOpenChange={setIsCategoriasOpen} />
        <AdminEditaisDialog open={isEditaisOpen} onOpenChange={setIsEditaisOpen} />
      </main>
    </div>
  );
};

export default AdminInscricoes;