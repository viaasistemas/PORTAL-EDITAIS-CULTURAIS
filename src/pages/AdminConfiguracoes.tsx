"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from 'lucide-react';
import { toast } from 'sonner';

const AdminConfiguracoes = () => {
  const { session, loading, profilePhoto, updateProfilePhoto } = useSession();
  const navigate = useNavigate();
  const [tempPhoto, setTempPhoto] = useState<string | null>(profilePhoto);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempPhoto) {
      updateProfilePhoto(tempPhoto);
      toast.success("Configurações atualizadas com sucesso!");
    }
  };

  if (loading || !session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />

      <main className="flex-grow flex flex-col">
        <AdminHeader title="Configurações" />

        <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-8">
          <div className="bg-white p-6 md:p-10 rounded-xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Perfil do Administrador</h1>
            <p className="text-slate-500 text-lg mb-10">Gerencie suas informações e preferências do sistema.</p>

            <div className="space-y-10">
              <div className="flex flex-col items-center sm:flex-row gap-8">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-full">
                    <AvatarImage src={tempPhoto || ''} className="rounded-full" />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold rounded-full">AD</AvatarFallback>
                  </Avatar>
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
                    <Camera size={20} />
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900">Foto de Perfil</h3>
                  <p className="text-slate-500 text-base mt-1">Clique no ícone da câmera para alterar sua foto.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-400 uppercase tracking-widest">E-mail de Acesso</Label>
                  <Input value={session.user.email} disabled className="h-14 rounded-xl bg-slate-50 border-slate-200 text-lg font-medium" />
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={handleSave} className="w-full sm:w-auto h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xl shadow-xl flex gap-3">
                  <Save size={22} /> Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminConfiguracoes;
</dyad-file>

<dyad-write path="src/pages/Inscricoes.tsx" description="Adicionando suporte a dados de teste para CPF 123.456.789-00 ou Protocolo 2026042026 para simular o acompanhamento de inscrição.">
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

    try {
      const cleanValue = searchValue.trim();
      
      // Intercepta dados de teste para simulação local
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
        }, 800);
        return;
      }

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

              <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Dados de Teste</p>
                <p className="text-xs text-blue-800 font-medium">Use o CPF <strong>123.456.789-00</strong> ou Protocolo <strong>2026042026</strong> para testar.</p>
              </div>

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