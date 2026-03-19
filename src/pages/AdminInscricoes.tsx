"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    { id: "1", proponente: "João Silva", edital: "Lei Paulo Gustavo", data: "12/05/2026", status: "Pendente", protocolo: "2026001" },
    { id: "2", proponente: "Maria Santos", edital: "Fomento Municipal", data: "11/05/2026", status: "Aprovado", protocolo: "2026002" },
    { id: "3", proponente: "Ricardo Pereira", edital: "PNAB", data: "10/05/2026", status: "Reprovado", protocolo: "2026003" },
    { id: "4", proponente: "Ana Oliveira", edital: "Lei Paulo Gustavo", data: "09/05/2026", status: "Pendente", protocolo: "2026004" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase"><CheckCircle2 size={12} /> Aprovado</span>;
      case 'Reprovado':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase"><XCircle size={12} /> Reprovado</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase"><Clock size={12} /> Pendente</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Gestão de Inscrições</h1>
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border-2 border-blue-600 p-0.5">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Buscar por proponente ou protocolo..." 
                className="pl-10 bg-white border-slate-200 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" className="rounded-xl border-slate-200 flex gap-2 flex-grow md:flex-grow-0">
                <Filter size={18} /> Filtrar
              </Button>
              <Button variant="outline" className="rounded-xl border-slate-200 flex gap-2 flex-grow md:flex-grow-0">
                <Download size={18} /> Exportar
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-bold text-slate-900">Protocolo</TableHead>
                  <TableHead className="font-bold text-slate-900">Proponente</TableHead>
                  <TableHead className="font-bold text-slate-900">Edital</TableHead>
                  <TableHead className="font-bold text-slate-900">Data</TableHead>
                  <TableHead className="font-bold text-slate-900">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-900">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInscricoes.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-mono font-bold text-blue-600">{item.protocol}</TableCell>
                    <TableCell className="font-medium text-slate-700">{item.proponente}</TableCell>
                    <TableCell className="text-slate-500">{item.edital}</TableCell>
                    <TableCell className="text-slate-500">{item.data}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="rounded-lg hover:bg-slate-100">
                        <MoreHorizontal size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminInscricoes;