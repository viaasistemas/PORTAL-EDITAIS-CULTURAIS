"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Plus, 
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

const Admin = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inscricoes, setInscricoes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pendentes: 0,
    aprovados: 0,
    editais: 3
  });

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login');
    }
  }, [session, loading, navigate]);

  useEffect(() => {
    const fetchInscricoes = async () => {
      const { data, error } = await supabase
        .from('inscricoes')
        .select(`
          *,
          editais (title)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao buscar inscrições:", error);
      } else {
        setInscricoes(data || []);
        const pendentes = data?.filter(i => i.status === 'pendente').length || 0;
        const aprovados = data?.filter(i => i.status === 'aprovado').length || 0;
        setStats(prev => ({ ...prev, total: data?.length || 0, pendentes, aprovados }));
      }
    };

    if (session) fetchInscricoes();
  }, [session]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('inscricoes')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error("Erro ao atualizar status.");
    } else {
      toast.success(`Inscrição ${newStatus} com sucesso!`);
      setInscricoes(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-blue-600 leading-none">CULTURA</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">Painel Administrativo</span>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('inscricoes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'inscricoes' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <FileText size={20} />
            Inscrições
          </button>
          <button 
            onClick={() => setActiveTab('editais')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'editais' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Plus size={20} />
            Gerenciar Editais
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold"
            onClick={() => supabase.auth.signOut()}
          >
            <LogOut size={20} />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeTab === 'dashboard' ? 'Visão Geral' : activeTab === 'inscricoes' ? 'Gerenciar Inscrições' : 'Editais'}
            </h1>
            <p className="text-slate-500 text-sm font-medium">Bem-vindo de volta, administrador.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input placeholder="Buscar..." className="pl-10 w-64 bg-white border-slate-200 rounded-xl" />
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Inscrições</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendentes}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Aprovados</p>
                <p className="text-3xl font-bold text-green-600">{stats.aprovados}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Editais Ativos</p>
                <p className="text-3xl font-bold text-blue-600">{stats.editais}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Inscrições Recentes</h3>
                <Button variant="ghost" className="text-blue-600 font-bold text-xs" onClick={() => setActiveTab('inscricoes')}>Ver todas</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-bold text-slate-500">Protocolo</TableHead>
                    <TableHead className="font-bold text-slate-500">Edital</TableHead>
                    <TableHead className="font-bold text-slate-500">Data</TableHead>
                    <TableHead className="font-bold text-slate-500">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inscricoes.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono font-bold text-blue-600">{item.protocol}</TableCell>
                      <TableCell className="font-medium">{item.editais?.title}</TableCell>
                      <TableCell className="text-slate-500">{new Date(item.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'aprovado' ? 'bg-green-100 text-green-700' : 
                          item.status === 'reprovado' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal size={16} /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => updateStatus(item.id, 'aprovado')} className="text-green-600 font-medium">Aprovar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(item.id, 'reprovado')} className="text-red-600 font-medium">Reprovar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === 'inscricoes' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-bold text-slate-500">Protocolo</TableHead>
                  <TableHead className="font-bold text-slate-500">Edital</TableHead>
                  <TableHead className="font-bold text-slate-500">Data</TableHead>
                  <TableHead className="font-bold text-slate-500">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inscricoes.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono font-bold text-blue-600">{item.protocol}</TableCell>
                    <TableCell className="font-medium">{item.editais?.title}</TableCell>
                    <TableCell className="text-slate-500">{new Date(item.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'aprovado' ? 'bg-green-100 text-green-700' : 
                        item.status === 'reprovado' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 rounded-lg border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => updateStatus(item.id, 'aprovado')}
                        >
                          <CheckCircle2 size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => updateStatus(item.id, 'reprovado')}
                        >
                          <XCircle size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === 'editais' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Plus className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Gerenciamento de Editais</h3>
            <p className="text-slate-500 max-w-xs mb-8">Em breve você poderá criar e editar novos editais diretamente por aqui.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 font-bold">Novo Edital</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;