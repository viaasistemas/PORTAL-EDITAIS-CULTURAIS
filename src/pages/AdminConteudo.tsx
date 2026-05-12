"use client";

import React, { useEffect } from 'react';
import { ExternalLink, Scale, BookOpen, FileCheck } from 'lucide-react';
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
    { title: "Legislação", count: 3, icon: Scale, color: "text-blue-600 bg-blue-50" },
    { title: "Manuais e Guias", count: 3, icon: BookOpen, color: "text-purple-600 bg-purple-50" },
    { title: "Modelos de Documentos", count: 3, icon: FileCheck, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <AdminHeader title="Gestão da Biblioteca" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Gestão da Biblioteca</h2>
              <p className="text-slate-500 text-sm">Gerencie os documentos e materiais de apoio disponíveis no portal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${section.color}`}>
                  <section.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{section.title}</h3>
                <p className="text-slate-400 text-sm font-medium mb-6">{section.count} arquivos listados</p>
                <Button variant="ghost" className="w-full justify-between rounded-xl hover:bg-slate-50 text-blue-600 font-bold group-hover:bg-blue-50">
                  Gerenciar Arquivos <ExternalLink size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminConteudo;