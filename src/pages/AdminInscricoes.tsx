"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminEditalCard from '@/components/AdminEditalCard';
import { Input } from '@/components/ui/input';
import { Search, Menu, Bell } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editaisData } from '@/data/editais';

const AdminInscricoes = () => {
  const { session, loading, profilePhoto } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'));
  };

  if (loading || !session) return null;

  const tabs = ["Todos", "Fomento Municipal", "LPG", "PNAB"];

  const filteredEditais = editaisData.filter(edital => {
    const matchesTab = activeTab === 'Todos' || 
                      (activeTab === 'Fomento Municipal' && edital.tipo === 'FM') ||
                      (activeTab === 'LPG' && edital.tipo === 'LPG') ||
                      (activeTab === 'PNAB' && edital.tipo === 'PNAB');
    
    const matchesStatus = statusFilter === 'todos' || 
                         (statusFilter === 'aberto' && edital.status === 'Aberto') ||
                         (statusFilter === 'encerrado' && edital.status === 'Encerrado');

    const cleanSearch = searchTerm.toLowerCase().replace('#', '');
    const matchesSearch = edital.title.toLowerCase().includes(cleanSearch) ||
                         edital.number.includes(cleanSearch);

    return matchesTab && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10 rounded-none">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-500 hover:bg-slate-50 rounded-none">
              <Menu size={24} />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-900 leading-none">Gestão de Editais</h1>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Sistema de Gestão Cultural</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-500">
                Olá, <span className="font-bold text-slate-900">Administrador</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-blue-600 transition-colors relative">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Avatar className="h-12 w-12 border-2 border-blue-600 p-0.5 rounded-none">
                <AvatarImage src={profilePhoto || ''} className="rounded-none" />
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold rounded-none">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Gestão de Inscrições</h2>
              <p className="text-slate-500 text-sm font-medium">Visualizar e gerenciar as inscrições recebidas por edital</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  placeholder="Buscar edital (ex: #012026)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 rounded-none border-slate-200 bg-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-white border-slate-200 rounded-none h-11">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="encerrado">Encerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-none px-6 h-11 font-bold text-sm transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditais.length > 0 ? (
              filteredEditais.map((edital) => (
                <AdminEditalCard key={edital.id} edital={edital} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-none border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Nenhum edital encontrado para este filtro.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminInscricoes;