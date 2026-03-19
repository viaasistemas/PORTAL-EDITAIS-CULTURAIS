"use client";

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { useSession } from '@/components/SessionContextProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, AlertTriangle, Folder, ArrowLeft } from 'lucide-react';

const AdminEditalDetalhes = () => {
  const { id } = useParams();
  const { session, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

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
              <h1 className="text-lg font-bold text-slate-900 leading-none">Detalhes do Edital #{id}</h1>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Gestão de Propostas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border-2 border-blue-600 p-0.5">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AG</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Ações de Gestão</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button className="h-24 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl flex flex-col gap-2 font-bold shadow-xl shadow-blue-100">
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

          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
            <p className="text-slate-400 font-medium">Selecione uma ação acima para visualizar os dados.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEditalDetalhes;