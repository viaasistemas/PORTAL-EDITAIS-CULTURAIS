"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Book, 
  Settings, 
  Plus, 
  Users, 
  FileText, 
  BarChart2, 
  TrendingUp,
  Menu,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from 'sonner';

const Admin = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login');
    }
  }, [session, loading, navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair.");
    } else {
      navigate('/login');
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Carregando painel...</p>
      </div>
    </div>
  );

  if (!session) return null;

  const stats = [
    { label: "Inscrições Totais", value: "1.234", icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Editais Ativos", value: "12", icon: FileText, color: "bg-green-50 text-green-600" },
    { label: "Em Análise", value: "8", icon: BarChart2, color: "bg-orange-50 text-orange-600" },
    { label: "Finalizados", value: "24", icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
  ];

  const recentInscriptions = [
    { name: "João Silva", time: "há 5 minutos" },
    { name: "Maria Santos", time: "há 2 horas" },
    { name: "Ricardo Pereira", time: "há 5 horas" },
    { name: "Ana Oliveira", time: "há 1 dia" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-8">
        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <Menu size={20} />
        </button>
        
        <nav className="flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <BarChart3 size={20} />
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
            <Calendar size={20} />
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
            <Book size={20} />
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 transition-all">
            <Settings size={20} />
          </button>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              LB
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none">Lei Aldir Blanc</h2>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Sistema de Gestão Cultural</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-500">
                Bem-vindo, <span className="font-bold text-slate-900">Administrador</span>
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{session.user.email}</p>
            </div>
            <Avatar className="h-10 w-10 border-2 border-blue-600 p-0.5">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full space-y-10">
          {/* Welcome & Action */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Olá, Administrador</h1>
              <p className="text-slate-500 font-medium mt-1">Bem-vindo ao painel de gestão do Portal Cultural.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 font-bold flex items-center gap-2 shadow-lg shadow-blue-100">
              <Plus size={18} />
              Gerenciar Inscrições
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-bold mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Access */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Acesso Rápido</h3>
              <p className="text-slate-400 text-xs font-medium mb-8">Atalhos para os detalhes principais</p>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-sm">
                  <Calendar size={18} className="text-blue-600" />
                  Inscrições
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-sm">
                  <Book size={18} className="text-purple-600" />
                  Conteúdo
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-sm">
                  <Settings size={18} className="text-slate-400" />
                  Configurações
                </button>
              </div>
            </div>

            {/* Recent Inscriptions */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Inscrições Recentes</h3>
              <p className="text-slate-400 text-xs font-medium mb-8">Últimos proponentes que enviaram projetos</p>
              
              <div className="space-y-6 flex-grow">
                {recentInscriptions.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] font-medium text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 text-blue-600 font-bold text-sm hover:underline self-center">
                Ver todas as inscrições
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;