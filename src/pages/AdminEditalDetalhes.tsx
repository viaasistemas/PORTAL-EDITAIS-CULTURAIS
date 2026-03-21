"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { useSession } from '@/components/SessionContextProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, AlertTriangle, Folder, ArrowLeft, Download, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminEditalDetalhes = () => {
  const { id } = useParams();
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'overview' | 'inscricoes' | 'recursos' | 'documentacao'>('overview');
  const [data, setData] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const fetchData = async (view: string) => {
    setFetching(true);
    let table = '';
    if (view === 'inscricoes') table = 'inscricoes';
    else if (view === 'recursos') table = 'recursos';
    else if (view === 'documentacao') table = 'documentacao';

    if (table) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('edital_id', id);
      
      if (!error && data) {
        setData(data);
      }
    }
    setFetching(false);
  };

  useEffect(() => {
    if (activeView !== 'overview') {
      fetchData(activeView);
    }
  }, [activeView, id]);

  if (loading || !session) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/inscricoes')} className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-900 leading-none">Edital #{id}</h1>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Gestão de Propostas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border-2 border-blue-600 p-0.5">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Ações de Gestão</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button 
                onClick={() => setActiveView('inscricoes')}
                className={`h-24 rounded-3xl flex flex-col gap-2 font-bold transition-all ${
                  activeView === 'inscricoes' 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileText size={24} />
                Inscrições
              </Button>
              
              <Button 
                onClick={() => setActiveView('recursos')}
                className={`h-24 rounded-3xl flex flex-col gap-2 font-bold transition-all ${
                  activeView === 'recursos' 
                    ? 'bg-red-600 text-white shadow-xl shadow-red-100' 
                    : 'bg-white border border-rose-100 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <AlertTriangle size={24} />
                Recursos
              </Button>
              
              <Button 
                onClick={() => setActiveView('documentacao')}
                className={`h-24 rounded-3xl flex flex-col gap-2 font-bold transition-all ${
                  activeView === 'documentacao' 
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' 
                    : 'bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <Folder size={24} />
                Documentação
              </Button>
            </div>
          </div>

          {activeView === 'overview' ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
              <p className="text-slate-400 font-medium">Selecione uma ação acima para visualizar os dados.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">
                  {activeView === 'inscricoes' ? 'Lista de Inscrições' : 
                   activeView === 'recursos' ? 'Lista de Recursos' : 'Lista de Documentações'}
                </h3>
                <Button variant="outline" size="sm" onClick={() => fetchData(activeView)} disabled={fetching} className="rounded-xl">
                  {fetching ? <Loader2 className="animate-spin" /> : "Atualizar"}
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-slate-900">Proponente</TableHead>
                      <TableHead className="font-bold text-slate-900">CPF</TableHead>
                      <TableHead className="font-bold text-slate-900">Nascimento</TableHead>
                      <TableHead className="font-bold text-slate-900">Protocolo</TableHead>
                      <TableHead className="font-bold text-slate-900">Arquivo</TableHead>
                      <TableHead className="font-bold text-slate-900">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20 text-slate-400 font-medium">
                          Nenhum registro encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.map((item) => (
                        <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-bold text-slate-900">{item.full_name}</TableCell>
                          <TableCell className="text-sm text-slate-600">{item.cpf}</TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {new Date(item.birth_date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-sm font-mono text-blue-600">{item.protocol}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 flex gap-2">
                              <FileText size={14} /> {item.file_name || 'Ver Arquivo'}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                              item.status === 'Aprovado' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'
                            }`}>
                              {item.status || 'Pendente'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminEditalDetalhes;