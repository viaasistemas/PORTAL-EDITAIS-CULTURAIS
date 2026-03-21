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
  const [activeView, setActiveView] = useState<'overview' | 'inscricoes'>('overview');
  const [inscricoes, setInscricoes] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const fetchInscricoes = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from('inscricoes')
      .select('*')
      .eq('edital_id', id);
    
    if (!error && data) {
      setInscricoes(data);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (activeView === 'inscricoes') {
      fetchInscricoes();
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
              
              <Button variant="outline" className="h-24 border-rose-100 text-rose-600 hover:bg-rose-50 rounded-3xl flex flex-col gap-2 font-bold">
                <AlertTriangle size={24} />
                Recursos
              </Button>
              
              <Button variant="outline" className="h-24 border-blue-100 text-blue-600 hover:bg-blue-50 rounded-3xl flex flex-col gap-2 font-bold">
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
                <h3 className="text-xl font-bold text-slate-900">Lista de Inscrições</h3>
                <Button variant="outline" size="sm" onClick={fetchInscricoes} disabled={fetching} className="rounded-xl">
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
                      <TableHead className="font-bold text-slate-900">Arquivos</TableHead>
                      <TableHead className="font-bold text-slate-900">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inscricoes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-20 text-slate-400 font-medium">
                          Nenhuma inscrição encontrada para este edital.
                        </TableCell>
                      </TableRow>
                    ) : (
                      inscricoes.map((inscricao) => (
                        <TableRow key={inscricao.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{inscricao.full_name}</span>
                              <span className="text-[10px] font-mono text-blue-600">{inscricao.protocol}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">{inscricao.cpf}</TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {new Date(inscricao.birth_date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5">
                              {[1, 2, 3, 4, 5].map(i => (
                                <Button key={i} variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600" title={`Anexo ${i}`}>
                                  <FileText size={14} />
                                </Button>
                              ))}
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-purple-50 hover:text-purple-600" title="Portfolio">
                                <ExternalLink size={14} />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase">
                              {inscricao.status}
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