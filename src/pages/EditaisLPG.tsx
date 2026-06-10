"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Paperclip, 
  AlertTriangle, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { editaisData, EditalDetail } from '@/data/editais';
import EditalDetailsDialog from '@/components/EditalDetailsDialog';
import InscricaoDialog from '@/components/InscricaoDialog';
import RecursoDialog from '@/components/RecursoDialog';
import DocumentacaoDialog from '@/components/DocumentacaoDialog';
import PublicFileUploadDialog from '@/components/PublicFileUploadDialog';

const EditaisLPG = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [selectedEdital, setSelectedEdital] = useState<EditalDetail | null>(null);
  const [inscricaoEdital, setInscricaoEdital] = useState<EditalDetail | null>(null);
  const [recursoEdital, setRecursoEdital] = useState<EditalDetail | null>(null);
  const [docEdital, setDocEdital] = useState<EditalDetail | null>(null);
  const [viewAnexos, setViewAnexos] = useState<EditalDetail | null>(null);
  const [viewResultados, setViewResultados] = useState<EditalDetail | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [categories, setCategories] = useState<string[]>(["Todas", "Audiovisual", "Artes Cênicas", "Música"]);
  const [dynamicEditais, setDynamicEditais] = useState<EditalDetail[]>(editaisData);
  const [editalSettings, setEditalSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadSettingsAndCategories = () => {
      const settings: Record<string, any> = {};
      
      // Carrega editais dinâmicos primeiro para obter todos os IDs
      const savedEditais = localStorage.getItem('admin_editais_list');
      const allEditais = savedEditais ? JSON.parse(savedEditais) : editaisData;
      setDynamicEditais(allEditais);

      allEditais.forEach((e: any) => {
        const saved = localStorage.getItem(`edital_settings_${e.id}`);
        if (saved) {
          settings[e.id] = JSON.parse(saved);
        } else {
          settings[e.id] = { isVisible: true };
        }
      });
      setEditalSettings(settings);

      // Carrega categorias dinâmicas do LPG
      const savedCats = localStorage.getItem('admin_categories_by_program');
      if (savedCats) {
        const parsed = JSON.parse(savedCats);
        setCategories(["Todas", ...(parsed.LPG || [])]);
      }
    };

    loadSettingsAndCategories();
    window.addEventListener('storage', loadSettingsAndCategories);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      window.removeEventListener('storage', loadSettingsAndCategories);
      clearInterval(timer);
    };
  }, []);

  const isPhaseActive = (editalId: string, phase: 'recurso' | 'documentacao' | 'prorrogacao') => {
    const settings = editalSettings[editalId];
    if (!settings) return false;

    const now = currentTime;
    let startStr, endStr, isActive;

    if (phase === 'recurso') {
      isActive = settings.isRecurso;
      startStr = `${settings.dates.recursoInicio}T${settings.dates.recursoHoraInicio}`;
      endStr = `${settings.dates.recursoFim}T${settings.dates.recursoHoraFim}`;
    } else if (phase === 'documentacao') {
      isActive = settings.isDocumentacao;
      startStr = `${settings.dates.docInicio}T${settings.dates.docHoraInicio}`;
      endStr = `${settings.dates.docFim}T${settings.dates.docHoraFim}`;
    } else {
      isActive = settings.isProrrogacao;
      startStr = `${settings.dates.prorrogacaoInicio}T${settings.dates.prorrogacaoHoraInicio}`;
      endStr = `${settings.dates.prorrogacaoFim}T${settings.dates.prorrogacaoHoraFim}`;
    }

    if (!isActive || !settings.dates[`${phase === 'prorrogacao' ? 'prorrogacao' : phase === 'recurso' ? 'recurso' : 'doc'}Inicio`]) return false;

    const start = new Date(startStr);
    const end = new Date(endStr);

    return now >= start && now <= end;
  };

  const getDynamicStatus = (edital: EditalDetail) => {
    const settings = editalSettings[edital.id];
    if (settings?.isFinalized) return 'Encerrado';
    if (isPhaseActive(edital.id, 'prorrogacao')) return 'Prorrogado';

    const now = currentTime;
    const aberturaStr = settings?.dates?.abertura && settings?.dates?.horaAbertura 
      ? `${settings.dates.abertura}T${settings.dates.horaAbertura}` 
      : edital.dataAbertura;
    const encerramentoStr = settings?.dates?.encerramento && settings?.dates?.horaEncerramento 
      ? `${settings.dates.encerramento}T${settings.dates.horaEncerramento}` 
      : edital.dataEncerramento;

    const start = aberturaStr ? new Date(aberturaStr) : null;
    const end = encerramentoStr ? new Date(encerramentoStr) : null;

    if (start && now < start) return 'Em breve';
    if (start && end && now >= start && now <= end) return 'Aberto';
    if (end && now > end) return 'Encerrado';
    
    return edital.status;
  };

  const formatDateTime = (dateStr: string | undefined, timeStr?: string) => {
    if (!dateStr) return "Não definida";
    const date = timeStr ? new Date(`${dateStr}T${timeStr}`) : new Date(dateStr);
    return date.toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' às');
  };

  const filteredEditais = dynamicEditais.filter(e => {
    if (e.tipo !== 'LPG') return false;

    const settings = editalSettings[e.id];
    if (settings && settings.isVisible === false) return false;

    const status = getDynamicStatus(e);
    const matchesStatus = filter === 'Todos' || 
                         (filter === 'Aberto' && (status === 'Aberto' || status === 'Prorrogado')) || 
                         (filter === 'Encerrado' && status === 'Encerrado');
    
    const matchesCategory = categoryFilter === 'Todas' || e.categories.includes(categoryFilter);

    return matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#2b59c3]">
              Editais: LPG
            </h1>
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
              <div className="w-12 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-base md:text-lg text-[#2b59c3] font-bold">
              Lei Paulo Gustavo
            </p>
          </div>
        </section>

        <section className="py-8 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#2b59c3] text-white shadow-lg shadow-blue-100' 
                      : 'text-slate-400 hover:text-[#2b59c3] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              {['Todos', 'Abertos', 'Encerrados'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab === 'Abertos' ? 'Aberto' : tab === 'Encerrados' ? 'Encerrado' : 'Todos')}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                    (filter === 'Todos' && tab === 'Todos') || 
                    (filter === 'Aberto' && tab === 'Abertos') || 
                    (filter === 'Encerrado' && tab === 'Encerrados')
                      ? 'bg-[#0a0f1c] text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredEditais.map((edital) => {
              const settings = editalSettings[edital.id];
              const status = getDynamicStatus(edital);
              const isAberto = status === 'Aberto' || status === 'Prorrogado';
              const isEmBreve = status === 'Em breve';
              const isEncerrado = status === 'Encerrado';
              const isFinalized = settings?.isFinalized;

              const displayInicio = settings?.dates?.abertura 
                ? formatDateTime(settings.dates.abertura, settings.dates.horaAbertura)
                : formatDateTime(edital.dataAbertura);
                
              const displayFim = settings?.dates?.encerramento 
                ? formatDateTime(settings.dates.encerramento, settings.dates.horaEncerramento)
                : formatDateTime(edital.dataEncerramento);

              return (
                <div key={edital.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xl font-bold text-[#2b59c3] max-w-[70%] leading-tight">
                      {edital.title}
                    </h3>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider ${
                      isAberto ? 'bg-emerald-50 text-emerald-600' : 
                      isEmBreve ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${isAberto ? 'bg-emerald-500' : isEmBreve ? 'bg-blue-500' : 'bg-rose-500'}`} />
                      {status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inicio das Inscrições</p>
                      <p className="text-sm font-bold text-slate-700">{displayInicio}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encerramento</p>
                      <p className="text-sm font-bold text-slate-700">{displayFim}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vagas</p>
                      <p className="text-sm font-bold text-slate-700">{edital.vagas}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categoria</p>
                      <p className="text-sm font-bold text-slate-700">{edital.categories[0]}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedEdital(edital)}
                        className="h-12 rounded-xl border-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-50"
                      >
                        Ver Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setViewAnexos(edital)}
                        className="h-12 rounded-xl border-slate-100 text-slate-600 font-bold text-xs flex gap-2 hover:bg-slate-50"
                      >
                        <Paperclip size={16} /> Anexos
                      </Button>
                    </div>

                    {isFinalized ? (
                      <Button 
                        onClick={() => setViewResultados(edital)}
                        className="w-full h-14 bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-100"
                      >
                        Resultados
                      </Button>
                    ) : (
                      <>
                        {isAberto && (
                          <Button 
                            onClick={() => setInscricaoEdital(edital)}
                            className="w-full h-14 bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-100"
                          >
                            Inscrever-se
                          </Button>
                        )}

                        {isEmBreve && (
                          <Button 
                            disabled
                            className="w-full h-14 bg-slate-100 text-slate-400 font-bold rounded-xl flex gap-2 cursor-not-allowed text-sm"
                          >
                            <Clock size={18} /> Aguardando Abertura
                          </Button>
                        )}

                        {isEncerrado && (
                          <div className="space-y-3">
                            {isPhaseActive(edital.id, 'recurso') && (
                              <Button 
                                onClick={() => setRecursoEdital(edital)}
                                className="w-full h-14 bg-[#ef4444] hover:bg-red-600 text-white font-bold rounded-xl flex gap-2 text-sm"
                              >
                                <AlertTriangle size={18} /> Recursos
                              </Button>
                            )}
                            {isPhaseActive(edital.id, 'documentacao') && (
                              <Button 
                                onClick={() => setDocEdital(edital)}
                                className="w-full h-14 bg-[#10b981] hover:bg-emerald-600 text-white font-bold rounded-xl flex gap-2 text-sm"
                              >
                                <CheckCircle2 size={18} /> Documentação
                              </Button>
                            )}
                            <Button 
                              onClick={() => setViewResultados(edital)}
                              className="w-full h-14 bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-100"
                            >
                              Resultados
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredEditais.length === 0 && (
              <div className="col-span-full py-20 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-400 font-bold text-lg">Nenhum edital disponível para esta categoria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedEdital && (
        <EditalDetailsDialog 
          edital={selectedEdital} 
          open={!!selectedEdital} 
          onOpenChange={(open) => !open && setSelectedEdital(null)} 
        />
      )}

      {inscricaoEdital && (
        <InscricaoDialog 
          edital={inscricaoEdital} 
          open={!!inscricaoEdital} 
          onOpenChange={(open) => !open && setInscricaoEdital(null)} 
        />
      )}

      {recursoEdital && (
        <RecursoDialog 
          edital={recursoEdital} 
          open={!!recursoEdital} 
          onOpenChange={(open) => !open && setRecursoEdital(null)} 
        />
      )}

      {docEdital && (
        <DocumentacaoDialog 
          edital={docEdital} 
          open={!!docEdital} 
          onOpenChange={(open) => !open && setDocEdital(null)} 
        />
      )}

      {viewAnexos && (
        <PublicFileUploadDialog
          title="Anexos do Edital"
          type="Anexos"
          open={!!viewAnexos}
          onOpenChange={(open) => !open && setViewAnexos(null)}
          editalTitle={viewAnexos.title}
          files={[]}
        />
      )}

      {viewResultados && (
        <PublicFileUploadDialog
          title="Resultados do Edital"
          type="Resultados"
          open={!!viewResultados}
          onOpenChange={(open) => !open && setViewResultados(null)}
          editalTitle={viewResultados.title}
          files={[]}
        />
      )}

      <Footer />
    </div>
  );
};

export default EditaisLPG;