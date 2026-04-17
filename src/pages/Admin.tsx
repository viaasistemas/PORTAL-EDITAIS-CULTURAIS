"use client";

import React, { useEffect } from 'react';
import { 
  Users, 
  FileText, 
  BarChart2, 
  TrendingUp,
  ArrowUpRight,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Admin = () => {
  const { session, loading, profilePhoto } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'));
  };

  if (loading || !session) return null;

  const stats = [
    { label: "Inscrições Totais", value: "1.234", icon: Users, color: "bg-blue-50 text-blue-600", trend: "+12%" },
    { label: "Editais Ativos", value: "12", icon: FileText, color: "bg-green-50 text-green-600", trend: "Estável" },
    { label: "Em Análise", value: "8", icon: BarChart2, color: "bg-orange-50 text-orange-600", trend: "-2%" },
    { label: "Finalizados", value: "24", icon: TrendingUp, color: "bg-purple-50 text-purple-600", trend: "+5%" },
  ];

  const recentInscriptions = [
    { name: "João Silva", time: "há 5 minutos", status: "Pendente" },
    { name: "Maria Santos", time: "há 2 horas", status: "Aprovado" },
    { name: "Ricardo Pereira", time: "há 5 horas", status: "Reprovado" },
    { name: "Ana Oliveira", time: "há 1 dia", status: "Pendente" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />

      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-500 hover:bg-slate-50 rounded-xl">
              <Menu size={24} />
            </Button>
            <h2 className="text-lg font-bold text-slate-900 leading-none">Painel de Controle</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-500">
                Olá, <span className="font-bold text-slate-900">Administrador</span>
              </p>
            </div>
            <Avatar className="h-12 w-12 border-2 border-blue-600 p-0.5">
              <AvatarImage src={profilePhoto || ''} />
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bem-vindo de volta</h1>
            <p className="text-slate-500 text-lg mt-1">Aqui está o resumo das atividades culturais de hoje.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold mb-1 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Inscrições Recentes</h3>
                  <p className="text-slate-400 text-sm font-medium">Últimos proponentes ativos</p>
                </div>
                <Button variant="ghost" className="text-blue-600 font-bold text-sm hover:bg-blue-50" onClick={() => navigate('/admin/inscricoes')}>
                  Ver todas <ArrowUpRight size={16} className="ml-1" />
                </Button>
              </div>
              
              <div className="space-y-5 flex-grow">
                {recentInscriptions.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.time}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                      item.status === 'Aprovado' ? 'bg-green-50 text-green-600' : 
                      item.status === 'Reprovado' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Atalhos</h3>
              <p className="text-slate-400 text-sm font-medium mb-10">Acesso rápido às ferramentas</p>
              
              <div className="space-y-4">
                <button onClick={() => navigate('/admin/conteudo')} className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-base group">
                  <span className="flex items-center gap-4">
                    <FileText size={22} className="text-blue-600" />
                    Editar Editais
                  </span>
                  <ArrowUpRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button onClick={() => navigate('/admin/conteudo')} className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-base group">
                  <span className="flex items-center gap-4">
                    <BarChart2 size={22} className="text-purple-600" />
                    Relatórios
                  </span>
                  <ArrowUpRight size={20} className="text-slate-300 group-hover:text-purple-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;