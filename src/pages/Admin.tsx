"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp,
  ArrowUpRight,
  Archive,
  Book
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { Button } from '@/components/ui/button';
import { editaisData, EditalDetail } from '@/data/editais';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [totalInscriptions, setTotalInscriptions] = useState(0);
  const [recentInscriptions, setRecentInscriptions] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
    
    const fetchData = async () => {
      // Total Inscriptions
      const { count } = await supabase
        .from('inscricoes')
        .select('*', { count: 'exact', head: true });
      
      if (count !== null) setTotalInscriptions(count);

      // Recent Inscriptions
      const { data } = await supabase
        .from('inscricoes')
        .select('id, full_name, created_at, edital_id')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (data) setRecentInscriptions(data);

      // Carrega editais dinâmicos e calcula status dinamicamente
      const savedEditais = localStorage.getItem('admin_editais_list');
      const list: EditalDetail[] = savedEditais ? JSON.parse(savedEditais) : editaisData;

      let ativos = 0;
      let encerrados = 0;
      let finalizados = 0;

      const now = new Date();

      list.forEach(edital => {
        const savedSettings = localStorage.getItem(`edital_settings_${edital.id}`);
        const settings = savedSettings ? JSON.parse(savedSettings) : null;

        if (settings?.isFinalized) {
          finalizados++;
          return;
        }

        // Verifica se a prorrogação está ativa
        let isProrrogado = false;
        if (settings?.isProrrogacao && settings?.dates?.prorrogacaoInicio) {
          const start = new Date(`${settings.dates.prorrogacaoInicio}T${settings.dates.prorrogacaoHoraInicio}`);
          const end = new Date(`${settings.dates.prorrogacaoFim}T${settings.dates.prorrogacaoHoraFim}`);
          if (now >= start && now <= end) {
            isProrrogado = true;
          }
        }

        if (isProrrogado) {
          ativos++;
          return;
        }

        const startStr = settings?.dates?.abertura && settings?.dates?.horaAbertura 
          ? `${settings.dates.abertura}T${settings.dates.horaAbertura}` 
          : edital.dataAbertura;
        const endStr = settings?.dates?.encerramento && settings?.dates?.horaEncerramento 
          ? `${settings.dates.encerramento}T${settings.dates.horaEncerramento}` 
          : edital.dataEncerramento;

        const start = startStr ? new Date(startStr) : null;
        const end = endStr ? new Date(endStr) : null;

        const status = (() => {
          if (start && now < start) return 'Em breve';
          if (start && end && now >= start && now <= end) return 'Aberto';
          return 'Encerrado';
        })();

        if (status === 'Aberto') {
          ativos++;
        } else if (status === 'Encerrado') {
          encerrados++;
        }
      });

      setStats([
        { label: "Inscrições Totais", value: (count !== null ? count : 0).toString(), icon: Users, color: "bg-blue-50 text-blue-600", trend: "Total" },
        { label: "Editais Ativos", value: ativos.toString(), icon: FileText, color: "bg-green-50 text-green-600", trend: "Aberto" },
        { label: "EDITAIS ENCERRADOS", value: encerrados.toString(), icon: Archive, color: "bg-rose-50 text-rose-600", trend: "Encerrados" },
        { label: "FINALIZADOS", value: finalizados.toString(), icon: TrendingUp, color: "bg-purple-50 text-purple-600", trend: "Finalizado" },
      ]);
    };

    if (session) fetchData();
  }, [session, loading, navigate]);

  if (loading || !session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />

      <main className="flex-grow flex flex-col">
        <AdminHeader title="Painel de Controle" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bem-vindo de volta</h1>
            <p className="text-slate-500 text-lg mt-1">Aqui está o resumo das atividades culturais de hoje.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-xl ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    stat.trend === 'Aberto' ? 'bg-green-50 text-green-600' : 
                    stat.trend === 'Encerrados' ? 'bg-rose-50 text-rose-600' : 
                    stat.trend === 'Finalizado' ? 'bg-purple-50 text-purple-600' : 'bg-slate-50 text-slate-400'
                  }`}>
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
            <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Inscrições Recentes</h3>
                  <p className="text-slate-400 text-sm font-medium">Últimos proponentes ativos</p>
                </div>
                <Button variant="ghost" className="text-blue-600 font-bold text-sm hover:bg-blue-50 rounded-xl" onClick={() => navigate('/admin/inscricoes')}>
                  Ver todas <ArrowUpRight size={16} className="ml-1" />
                </Button>
              </div>
              
              <div className="space-y-5 flex-grow">
                {recentInscriptions.length > 0 ? (
                  recentInscriptions.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all gap-4">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                          {item.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900">{item.full_name}</p>
                          <p className="text-xs text-slate-400 font-medium">
                            {new Date(item.created_at).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/admin/inscricoes/${item.edital_id}`)}
                        className="w-full sm:w-auto border-blue-100 text-blue-600 font-bold hover:bg-blue-50 rounded-xl"
                      >
                        Ver Inscrição
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400">Nenhuma inscrição recente.</div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Atalhos</h3>
              <p className="text-slate-400 text-sm font-medium mb-10">Acesso rápido às ferramentas</p>
              
              <div className="space-y-4">
                <button onClick={() => navigate('/admin/inscricoes')} className="w-full flex items-center justify-between p-5 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-base group">
                  <span className="flex items-center gap-4">
                    <FileText size={22} className="text-blue-600" />
                    Editais
                  </span>
                  <ArrowUpRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button onClick={() => navigate('/admin/biblioteca')} className="w-full flex items-center justify-between p-5 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all text-slate-700 font-bold text-base group">
                  <span className="flex items-center gap-4">
                    <Book size={22} className="text-purple-600" />
                    Biblioteca
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