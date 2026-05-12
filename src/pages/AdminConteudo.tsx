"use client";

import React, { useState, useEffect } from 'react';
import { Scale, BookOpen, FileCheck, Settings2 } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminBibliotecaDialog from '@/components/AdminBibliotecaDialog';
import { supabase } from '@/integrations/supabase/client';

const AdminConteudo = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({
    "Legislação": 0,
    "Manuais e Guias": 0,
    "Modelos de Documentos": 0
  });

  const fetchCounts = async () => {
    const { data, error } = await supabase.from('biblioteca').select('category');
    if (!error && data) {
      const newCounts: Record<string, number> = {
        "Legislação": 0,
        "Manuais e Guias": 0,
        "Modelos de Documentos": 0
      };
      data.forEach(item => {
        if (newCounts[item.category] !== undefined) {
          newCounts[item.category]++;
        }
      });
      setCounts(newCounts);
    }
  };

  useEffect(() => {
    if (!loading && !session) navigate('/login');
    if (session) fetchCounts();
  }, [session, loading, navigate]);

  if (loading || !session) return null;

  const sections = [
    { title: "Legislação", icon: Scale, color: "text-blue-600 bg-blue-50" },
    { title: "Manuais e Guias", icon: BookOpen, color: "text-purple-600 bg-purple-50" },
    { title: "Modelos de Documentos", icon: FileCheck, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <AdminHeader title="Gestão da Biblioteca" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Biblioteca</h2>
              <p className="text-slate-500 text-lg font-medium">Gerencie os documentos e materiais de apoio disponíveis no portal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${section.color}`}>
                  <section.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{section.title}</h3>
                <p className="text-slate-400 text-base font-bold mb-10">{counts[section.title]} arquivos listados</p>
                <Button 
                  onClick={() => setSelectedCategory(section.title)}
                  className="w-full h-14 justify-between rounded-2xl bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold border border-transparent hover:border-blue-100 transition-all px-6"
                >
                  Gerenciar Arquivos <Settings2 size={20} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedCategory && (
        <AdminBibliotecaDialog 
          category={selectedCategory} 
          open={!!selectedCategory} 
          onOpenChange={(open) => {
            if (!open) {
              setSelectedCategory(null);
              fetchCounts();
            }
          }} 
        />
      )}
    </div>
  );
};

export default AdminConteudo;