"use client";

import React, { useEffect } from 'react';
import { Plus, FileEdit, ExternalLink, Image as ImageIcon } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminConteudo = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  if (loading || !session) return null;

  const sections = [
    { title: "Editais", count: 12, icon: FileEdit, color: "text-blue-600 bg-blue-50" },
    { title: "Biblioteca", count: 45, icon: ImageIcon, color: "text-purple-600 bg-purple-50" },
    { title: "Notícias", count: 8, icon: FileEdit, color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <AdminHeader title="Gestão de Conteúdo" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Visão Geral</h2>
              <p className="text-slate-500 text-sm">Gerencie as informações exibidas no portal público.</p>
            </div>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold flex gap-2 shadow-lg">
              <Plus size={18} /> Novo Conteúdo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${section.color}`}>
                  <section.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{section.title}</h3>
                <p className="text-slate-400 text-sm font-medium mb-6">{section.count} itens publicados</p>
                <Button variant="ghost" className="w-full justify-between rounded-xl hover:bg-slate-50 text-blue-600 font-bold group-hover:bg-blue-50">
                  Gerenciar <ExternalLink size={16} />
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Ações Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group">
                <p className="font-bold text-slate-800 group-hover:text-blue-600">Banner Principal</p>
                <p className="text-xs text-slate-400 mt-1">Alterar imagem do hero</p>
              </button>
              <button className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group">
                <p className="font-bold text-slate-800 group-hover:text-blue-600">Categorias</p>
                <p className="text-xs text-slate-400 mt-1">Editar ícones e textos</p>
              </button>
              <button className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group">
                <p className="font-bold text-slate-800 group-hover:text-blue-600">Rodapé</p>
                <p className="text-xs text-slate-400 mt-1">Atualizar contatos</p>
              </button>
              <button className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group">
                <p className="font-bold text-slate-800 group-hover:text-blue-600">Documentos</p>
                <p className="text-xs text-slate-400 mt-1">Upload de PDFs</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminConteudo;