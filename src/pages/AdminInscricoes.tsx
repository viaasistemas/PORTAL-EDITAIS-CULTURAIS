"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AdminEditalCard from '@/components/AdminEditalCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminInscricoes = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Todos');

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  if (loading || !session) return null;

  const tabs = ["Todos", "Fomento Municipal", "GLP", "PNAB"];

  const editais = [
    {
      title: "PNAB - Fomento Cultura Popular 2026",
      status: "Aberto" as const,
      inscriptionsCount: 0,
      date: "05/04/2026"
    },
    {
      title: "PNAB - Fomento às Artes Cênicas 2024",
      status: "Aberto" as const,
      inscriptionsCount: 156,
      date: "Até 15/05/2024"
    },
    {
      title: "PNAB - Música Popular Brasileira 2024",
      status: "Encerrado" as const,
      inscriptionsCount: 203,
      date: "30/05/2024"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-900 leading-none">Lei Aldir Blanc</h1>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Sistema de Gestão Cultural</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-500">
                Bem-vindo, <span className="font-bold text-slate-900">Almirante Geral</span>
              </p>
            </div>
            <Avatar className="h-10 w-10 border-2 border-blue-600 p-0.5">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AG</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Title and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Gestão de Inscrições</h2>
              <p className="text-slate-500 text-sm font-medium">Visualizar e gerenciar as inscrições recebidas por edital</p>
            </div>
            
            <Select defaultValue="todos">
              <SelectTrigger className="w-[200px] bg-white border-slate-200 rounded-xl h-11">
                <SelectValue placeholder="Todos os Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="aberto">Aberto</SelectItem>
                <SelectItem value="encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-6 h-11 font-bold text-sm transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editais.map((edital, index) => (
              <AdminEditalCard key={index} {...edital} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminInscricoes;