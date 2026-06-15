"use client";

import React, { useState } from 'react';
import { Search, Loader2, FileText, Calendar, CheckCircle2, Clock, Download, Printer, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Inscricoes = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      toast.error("Por favor, insira um número de protocolo.");
      return;
    }

    setLoading(true);
    setResults([]);
    setSelectedResult(null);

    const cleanValue = searchValue.trim();
    let combinedResults: any[] = [];

    // 1. Carrega inscrições locais do localStorage
    const localInscriptions = JSON.parse(localStorage.getItem('local_inscricoes') || '[]');
    const matchingLocal = localInscriptions.filter((ins: any) => ins.protocol === cleanValue);

    matchingLocal.forEach((localItem: any) => {
      combinedResults.push({
        id: localItem.id,
        full_name: localItem.full_name,
        cpf: localItem.cpf,
        protocol: localItem.protocol,
        created_at: localItem.created_at,
        status: localItem.status,
        editais: {
          title: 'Edital Local'
        }
      });
    });

    // 2. Interceptação para dados de teste simulados
    if (cleanValue === '2026042026') {
      combinedResults.push({
        id: 'test-id',
        full_name: 'João da Silva',
        cpf: '123.456.789-00',
        protocol: '2026042026',
        created_at: '2026-04-20T14:30:00.000Z',
        status: 'CONFIRMADA',
        editais: {
          title: 'PNAB - Fomento à Literatura 2026'
        }
      });
    }

    try {
      // 3. Busca no Supabase apenas por protocolo
      const { data, error } = await supabase
        .from('inscricoes')
        .select(`
          *,
          editais (
            title
          )
        `)
        .eq('protocol', cleanValue);

      if (!error && data) {
        data.forEach((item: any) => {
          if (!combinedResults.some(r => r.protocol === item.protocol)) {
            combinedResults.push(item);
          }
        });
      }
    } catch (error: any) {
      console.error("Erro ao buscar inscrição:", error);
    }

    if (combinedResults.length === 0) {
      toast.error("Nenhuma inscrição encontrada.");
    } else {
      setResults(combinedResults);
      if (combinedResults.length === 1) {
        setSelectedResult(combinedResults[0]);
      }
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string, protocol: string) => {
    const currentStatus = localStorage.getItem(`inscription_status_${protocol}`) || status || 'CONFIRMADA';
    const normalized = currentStatus.trim().toUpperCase();

    if (normalized === 'CONFIRMADA' || normalized === 'INSCRIÇÃO CONFIRMADA' || normalized === 'PENDENTE') {
      return (
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider border border-emerald-100">
          <CheckCircle2 size={14} /> Sua inscrição está CONFIRMADA
        </span>
      );
    }
    if (normalized === 'DOCUMENTAÇÃO' || normalized === 'ENVIAR DOCUMENTAÇÃO') {
      return (
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider border border-amber-100">
          <Clock size={14} /> Enviar DOCUMENTAÇÃO
        </span>
      );
    }
    if (normalized === 'APROVADO') {
      return (
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
          <CheckCircle2 size={14} /> APROVADO
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-100">
        {currentStatus}
      </span>
    );
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  const maskCpfCnpj = (val: string) => {
    if (!val) return '';
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 11) {
      // CPF: ***.***.***-XX -> mask all except last 3 digits
      const lastThree = val.substring(val.length - 3);
      const prefix = val.substring(0, val.length - 3).replace(/\d/g, '*');
      return prefix + lastThree;
    } else {
      // CNPJ: **.***.***/****-XX -> mask all except last 3 digits
      const lastThree = val.substring(val.length - 3);
      const prefix = val.substring(0, val.length - 3).replace(/\d/g, '*');
      return prefix + lastThree;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#2b59c3]">
              Acompanhar Inscrição
            </h1>
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
              <div className="w-12 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-base md:text-lg text-black font-bold">
              Utilize o número do protocolo para verificar a inscrição.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-12">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Consultar Inscrição</h2>
              
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input 
                    type="text" 
                    placeholder="Digite seu número de protocolo" 
                    className="pl-12 h-14 rounded-xl border-slate-200 focus:ring-[#2b59c3] text-lg font-medium"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-14 px-10 bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-100"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Buscar"}
                </Button>
              </form>

              {/* Seletor de Inscrições se houver mais de uma */}
              {results.length > 1 && !selectedResult && (
                <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-bold text-slate-900">Múltiplas Inscrições Encontradas</h3>
                    <p className="text-sm text-slate-400 mt-1">Selecione qual inscrição deseja visualizar:</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {results.map((res) => (
                      <button
                        key={res.protocol}
                        onClick={() => setSelectedResult(res)}
                        className="flex items-center justify-between p-5 bg-slate-50 hover:bg-blue-50/30 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all text-left group"
                      >
                        <div>
                          <p className="font-bold text-slate-900 text-base">{res.editais?.title || 'Edital'}</p>
                          <p className="text-xs text-slate-400 font-mono mt-1">Protocolo: {res.protocol}</p>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedResult && (
                <div className="mt-12 pt-12 border-t border-slate-50 animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
                  {results.length > 1 && (
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedResult(null)}
                      className="text-blue-600 font-bold text-xs hover:bg-blue-50 rounded-xl"
                    >
                      ← Voltar para a lista de inscrições
                    </Button>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status da Inscrição</p>
                      {getStatusBadge(selectedResult.status, selectedResult.protocol)}
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Protocolo</p>
                      <p className="text-2xl font-mono font-bold text-[#2b59c3]">{selectedResult.protocol}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-4 text-[#2b59c3]">
                        <FileText size={18} />
                        <h3 className="text-xs font-bold uppercase tracking-wider">Edital</h3>
                      </div>
                      <p className="text-slate-900 font-bold text-sm">{selectedResult.editais?.title || 'Edital não identificado'}</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-4 text-[#2b59c3]">
                        <Calendar size={18} />
                        <h3 className="text-xs font-bold uppercase tracking-wider">Data de Envio</h3>
                      </div>
                      <p className="text-slate-900 font-bold text-sm">
                        {new Date(selectedResult.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Seção do Comprovante de Inscrição */}
                  <div className="border border-slate-100 rounded-2xl p-8 bg-slate-50/50 space-y-6 print:border-none print:bg-white">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Comprovante de Inscrição</h3>
                        <p className="text-xs text-slate-400">Portal de Editais Culturais - Extremoz-RN</p>
                      </div>
                      <CheckCircle2 className="text-emerald-500" size={32} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Proponente</p>
                        <p className="font-bold text-slate-800 mt-0.5">{selectedResult.full_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">CPF / CNPJ</p>
                        <p className="font-bold text-slate-800 mt-0.5">{maskCpfCnpj(selectedResult.cpf)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Protocolo</p>
                        <p className="font-mono font-bold text-[#2b59c3] mt-0.5">{selectedResult.protocol}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Data de Emissão</p>
                        <p className="font-bold text-slate-800 mt-0.5">{new Date(selectedResult.created_at).toLocaleString('pt-BR')}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100 print:hidden">
                      <Button 
                        onClick={handleDownloadReceipt}
                        className="flex-1 h-12 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex gap-2"
                      >
                        <Download size={16} /> Baixar Comprovante
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.print()}
                        className="h-12 rounded-xl border-slate-200 text-slate-600 font-bold flex gap-2"
                      >
                        <Printer size={16} /> Imprimir
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Inscricoes;