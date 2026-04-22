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
  const [protocol, setProtocol] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocol.trim()) {
      toast.error("Por favor, insira um número de protocolo.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('inscricoes')
        .select(`
          *,
          editais (
            title
          )
        `)
        .eq('protocol', protocol.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.error("Protocolo não encontrado.");
        } else {
          throw error;
        }
      } else {
        setResult(data);
      }
    } catch (error: any) {
      console.error("Erro ao buscar protocolo:", error);
      toast.error("Ocorreu um erro ao buscar o protocolo.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aprovado':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-green-100 text-green-700 text-xs font-bold uppercase"><CheckCircle2 size={14} /> Aprovado</span>;
      case 'reprovado':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-100 text-red-700 text-xs font-bold uppercase"><AlertCircle size={14} /> Reprovado</span>;
      case 'pendente':
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-yellow-100 text-yellow-700 text-xs font-bold uppercase"><Clock size={14} /> Em Análise</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-48 pb-32 bg-blue-600 text-center text-white px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Acompanhar Inscrição
            </h1>
            <p className="text-lg md:text-xl text-blue-50 font-medium opacity-90">
              Utilize o número do seu protocolo para verificar a sua inscrição.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="relative -mt-16 px-4 pb-24">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Consultar Protocolo</h2>
              
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    type="text" 
                    placeholder="Ex: 2026123456" 
                    className="pl-12 h-14 rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Buscar"}
                </Button>
              </form>

              {/* Results Area */}
              {result && (
                <div className="mt-12 pt-12 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status da Inscrição</p>
                      {getStatusBadge(result.status)}
                    </div>
                    <div className="text-right md:text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Protocolo</p>
                      <p className="text-xl font-mono font-bold text-blue-600">{result.protocol}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <FileText size={20} />
                        <h3 className="font-bold">Detalhes do Edital</h3>
                      </div>
                      <p className="text-gray-900 font-semibold">{result.editais?.title || 'Edital não identificado'}</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <Calendar size={20} />
                        <h3 className="font-bold">Data de Envio</h3>
                      </div>
                      <p className="text-gray-900 font-semibold">
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