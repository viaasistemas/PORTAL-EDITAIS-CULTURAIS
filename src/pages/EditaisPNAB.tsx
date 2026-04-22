"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Paperclip, 
  AlertTriangle, 
  CheckCircle2,
  Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { editaisData, EditalDetail } from '@/data/editais';
import EditalDetailsDialog from '@/components/EditalDetailsDialog';
import InscricaoDialog from '@/components/InscricaoDialog';
import RecursoDialog from '@/components/RecursoDialog';
import DocumentacaoDialog from '@/components/DocumentacaoDialog';

const EditaisPNAB = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [selectedEdital, setSelectedEdital] = useState<EditalDetail | null>(null);
  const [inscricaoEdital, setInscricaoEdital] = useState<EditalDetail | null>(null);
  const [recursoEdital, setRecursoEdital] = useState<EditalDetail | null>(null);
  const [docEdital, setDocEdital] = useState<EditalDetail | null>(null);

  const filteredEditais = editaisData.filter(e => {
    if (filter === 'Todos') return true;
    return e.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-20 bg-[#2b59c3] text-center text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Editais: PNAB
            </h1>
            <p className="text-lg md:text-xl opacity-90 font-medium">
              Política Nacional Aldir Blanc
            </p>
          </div>
        </section>

        <section className="py-8 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/editais')}
              className="bg-white border-slate-200 rounded-xl px-6 h-12 font-bold text-slate-600 flex gap-2 hover:bg-slate-50"
            >
              <ArrowLeft size={18} /> Voltar
            </Button>

            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
              {['Todos', 'Abertos', 'Encerrados'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab === 'Abertos' ? 'Aberto' : tab === 'Encerrados' ? 'Encerrado' : 'Todos')}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                    (filter === 'Todos' && tab === 'Todos') || 
                    (filter === 'Aberto' && tab === 'Abertos') || 
                    (filter === 'Encerrado' && tab === 'Encerrados')
                      ? 'bg-[#0a0f1c] text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-600'
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
            {filteredEditais.map((edital) => (
              <div key={edital.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold text-slate-900 max-w-[70%] leading-tight">
                    {edital.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                    edital.status === 'Aberto' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${edital.status === 'Aberto' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {edital.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Info size={16} />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Prazo Atual</p>
                    </div>
                    <p className="text-sm font-bold text-slate-500">{edital.prazoAtual}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Calendar size={16} />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Prazo Final</p>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{edital.terminoInscricao}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users size={16} />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Vagas</p>
                    </div>
                    <p className="text-sm font-bold text-slate-500">{edital.vagas}</p>
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
                    <Button variant="outline" className="h-12 rounded-xl border-slate-100 text-slate-600 font-bold text-xs flex gap-2 hover:bg-slate-50">
                      <Paperclip size={16} /> Anexos
                    </Button>
                  </div>

                  {edital.status === 'Aberto' ? (
                    <Button 
                      onClick={() => setInscricaoEdital(edital)}
                      className="w-full h-14 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100"
                    >
                      Inscrever-se
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => setRecursoEdital(edital)}
                          className="h-14 bg-[#ef4444] hover:bg-red-600 text-white font-bold rounded-xl flex gap-2"
                        >
                          <AlertTriangle size={18} /> Recursos
                        </Button>
                        <Button 
                          onClick={() => setDocEdital(edital)}
                          className="h-14 bg-[#10b981] hover:bg-emerald-600 text-white font-bold rounded-xl flex gap-2"
                        >
                          <CheckCircle2 size={18} /> Documentação
                        </Button>
                      </div>
                      <Button className="w-full h-14 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold rounded-xl">
                        Resultados
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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

      <Footer />
    </div>
  );
};

export default EditaisPNAB;