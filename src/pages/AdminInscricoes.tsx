"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminEditalCard from '@/components/AdminEditalCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editaisData } from '@/data/editais';

const AdminInscricoes = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

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
        <AdminHeader title="Gestão de Editais" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
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
                  className="pl-10 h-11 rounded-xl border-slate-200 bg-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-white border-slate-200 rounded-xl h-11">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditais.length > 0 ? (
              filteredEditais.map((edital) => (
                <AdminEditalCard key={edital.id} edital={edital} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
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