"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Eye,
  FileDown,
  User,
  Hash,
  Calendar as CalendarIcon
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminInscricoes = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  if (loading || !session) return null;

  const mockInscricoes = [
    { id: "1", proponente: "João Silva", edital: "Lei Paulo Gustavo", data: "12/05/2026", status: "Pendente", protocolo: "2026001", categoria: "Audiovisual" },
    { id: "2", proponente: "Maria Santos", edital: "Fomento Municipal", data: "11/05/2026", status: "Aprovado", protocolo: "2026002", categoria: "Artesanato" },
    { id: "3", proponente: "Ricardo Pereira", edital: "PNAB", data: "10/05/2026", status: "Reprovado", protocolo: "2026003", categoria: "Música" },
    { id: "4", proponente: "Ana Oliveira", edital: "Lei Paulo Gustavo", data: "09/05/2026", status: "Pendente", protocolo: "2026004", categoria: "Literatura" },
    { id: "5", proponente: "Carlos Eduardo", edital: "Fomento Municipal", data: "08/05/2026", status: "Aprovado", protocolo: "2026005", categoria: "Teatro" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider border border-emerald-100">
            <CheckCircle2 size={14} /> Aprovado
          </span>
        );
      case 'Reprovado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-bold uppercase tracking-wider border border-rose-100">
            <XCircle size={14} /> Reprovado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold uppercase tracking-wider border border-amber-100">
            <Clock size={14} /> Em Análise
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FileDown size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Gestão de Inscrições</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Administrador</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Acesso Total</p>
            </div>
            <Avatar className="h-10 w-10 border-2 border-blue-600 p-0.5">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total de Inscrições</p>
              <p className="text-3xl font-bold text-slate-900">1.234</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Aguardando Análise</p>
              <p className="text-3xl font-bold text-amber-600">452</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Aprovados este mês</p>
              <p className="text-3xl font-bold text-emerald-600">89</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  placeholder="Buscar por proponente ou protocolo..." 
                  className="pl-12 h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-blue-500 rounded-2xl transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 flex gap-2 font-bold text-slate-600 hover:bg-slate-50">
                  <Filter size={18} /> Filtrar
                </Button>
                <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 flex gap-2 font-bold text-slate-600 hover:bg-slate-50">
                  <Download size={18} /> Exportar CSV
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="font-bold text-slate-900 h-14 px-6">Protocolo</TableHead>
                    <TableHead className="font-bold text-slate-900 h-14 px-6">Proponente</TableHead>
                    <TableHead className="font-bold text-slate-900 h-14 px-6">Edital</TableHead>
                    <TableHead className="font-bold text-slate-900 h-14 px-6">Data</TableHead>
                    <TableHead className="font-bold text-slate-900 h-14 px-6">Status</TableHead>
                    <TableHead className="text-right font-bold text-slate-900 h-14 px-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInscricoes.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                      <TableCell className="px-6 py-4">
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-xs">
                          #{item.protocol}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-900">{item.proponente}</p>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{item.categoria}</p>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-600">{item.edital}</span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="text-sm text-slate-500">{item.data}</span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100">
                              <MoreHorizontal size={18} className="text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-xl border-slate-100">
                            <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Ações</DropdownMenuLabel>
                            <DropdownMenuItem className="rounded-xl flex gap-3 font-medium text-slate-700 focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                              <Eye size={16} /> Visualizar Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl flex gap-3 font-medium text-slate-700 focus:bg-blue-50 focus:text-blue-600 cursor-pointer">
                              <FileDown size={16} /> Baixar Documentos
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100 my-1" />
                            <DropdownMenuItem className="rounded-xl flex gap-3 font-bold text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
                              <CheckCircle2 size={16} /> Aprovar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl flex gap-3 font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer">
                              <XCircle size={16} /> Reprovar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-xs font-medium text-slate-400">Mostrando 5 de 1.234 inscrições</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-xs font-bold" disabled>Anterior</Button>
                <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-xs font-bold">Próxima</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminInscricoes;