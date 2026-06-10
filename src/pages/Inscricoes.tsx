"use client";

import React, { useState } from 'react';
import { Search, Loader2, FileText, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Inscricoes = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      toast.error("Por favor, insira um CPF ou Protocolo.");
      return;
    }

    setLoading(true);
    setResult(null);

    const cleanValue = searchValue.trim();

    // Interceptação para dados de teste simulados
    if (cleanValue === '123.456.789-00' || cleanValue === '2026042026') {
      setTimeout(() => {
        setResult({
          id: 'test-id',
          full_name: 'João da Silva',
          cpf: '123.456.789-00',
          protocol: '2026042026',
          created_at: '2026-04-20T14:30:00.000Z',
          status: 'Pendente',
          editais: {
            title: 'PNAB - Fomento à Literatura 2026'
          }
        });
        setLoading(false);
      }, 600);
      return;
    }

    try {
      // Busca por protocolo OU cpf no Supabase
      const { data, error } = await supabase
        .from('inscricoes')
        .select(`
          *,
          editais (
            title
          )
        `)
        .or(`protocol.eq.${cleanValue},cpf.eq.${cleanValue}`)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error("Inscrição não encontrada.");
      } else {
        setResult(data);
      }
    } catch (error: any) {
      console.error("Erro ao buscar inscrição:", error);
      toast.error("Ocorreu um erro ao buscar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aprovado':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider"><CheckCircle2 size={12} /> Aprovado</span>;
      case 'reprovado':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider"><AlertCircle size={12} /> Reprovado</span>;
      case 'pendente':
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider"><Clock size={12} /> Em Análise</span>;
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
              Utilize o CPF ou número do seu protocolo para verificar a sua inscrição.
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
                    placeholder="CPF ou Protocolo" 
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

              {result && (
                <div className="mt-12 pt-12 border-t border-slate-50 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status da Inscrição</p>
                      {getStatusBadge(result.status)}
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Protocolo</p>
                      <p className="text-2xl font-mono font-bold text-[#2b59c3]">{result.protocol}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-4 text-[#2b59c3]">
                        <FileText size={18} />
                        <h3 className="text-xs font-bold uppercase tracking-wider">Edital</h3>
                      </div>
                      <p className="text-slate-900 font-bold text-sm">{result.editais?.title || 'Edital não identificado'}</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-4 text-[#2b59c3]">
                        <Calendar size={18} />
                        <h3 className="text-xs font-bold uppercase tracking-wider">Data de Envio</h3>
                      </div>
                      <p className="text-slate-900 font-bold text-sm">
                        {new Date(result.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
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