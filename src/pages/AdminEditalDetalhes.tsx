"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from '@/components/SessionContextProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  AlertTriangle, 
  Folder, 
  ArrowLeft, 
  Search, 
  Calendar as CalendarIcon,
  Download,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from 'sonner';

const AdminEditalDetalhes = () => {
  const { id } = useParams();
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'overview' | 'inscricoes' | 'recursos' | 'documentacao'>('inscricoes');
  const [data, setData] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [selectedFiles, setSelectedFiles] = useState<any[] | null>(null);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const fetchData = async (view: string) => {
    setFetching(true);
    let table = '';
    if (view === 'inscricoes') table = 'inscricoes';
    else if (view === 'recursos') table = 'recursos';
    else if (view === 'documentacao') table = 'documentacao';

    let fetchedData: any[] = [];

    if (table) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('edital_id', id);
      
      if (!error && data) {
        fetchedData = data;
      }
    }

    // Carrega e mescla dados locais do localStorage para simulação instantânea
    const localKey = `local_${view}`;
    const localItems = JSON.parse(localStorage.getItem(localKey) || '[]');
    const filteredLocalItems = localItems.filter((item: any) => item.edital_id === id);
    
    filteredLocalItems.forEach((localItem: any) => {
      if (!fetchedData.some(item => item.protocol === localItem.protocol)) {
        fetchedData.push(localItem);
      }
    });

    // Injeta dados de teste se o edital for o 042026
    if (id === '042026') {
      if (view === 'inscricoes') {
        const testInscriptions = [
          {
            id: 'test-id-1',
            full_name: 'João da Silva',
            cpf: '123.456.789-00',
            protocol: '2026042026',
            projectName: 'Poesia na Praça',
            created_at: '2026-04-20T14:30:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-id-2',
            full_name: 'Maria Souza',
            cpf: '222.333.444-55',
            protocol: '2026042027',
            projectName: 'Contos de Extremoz',
            created_at: '2026-04-21T10:15:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-id-3',
            full_name: 'Pedro Santos',
            cpf: '333.444.555-66',
            protocol: '2026042028',
            projectName: 'Teatro de Bonecos',
            created_at: '2026-04-22T16:45:00.000Z',
            status: 'DOCUMENTAÇÃO'
          },
          {
            id: 'test-id-4',
            full_name: 'Ana Oliveira',
            cpf: '444.555.666-77',
            protocol: '2026042029',
            projectName: 'Slam da Resistência',
            created_at: '2026-04-23T09:00:00.000Z',
            status: 'APROVADO'
          },
          {
            id: 'test-id-5',
            full_name: 'Carlos Lima Ltda',
            cpf: '12.345.678/0001-99',
            protocol: '2026042030',
            projectName: 'Feira Literária',
            created_at: '2026-04-24T11:30:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-id-6',
            full_name: 'Fernanda Ribeiro',
            cpf: '555.666.777-88',
            protocol: '2026042031',
            projectName: 'Oficina de Cordel',
            created_at: '2026-04-24T15:20:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-id-7',
            full_name: 'Roberto Alencar',
            cpf: '666.777.888-99',
            protocol: '2026042032',
            projectName: 'Histórias do Mar',
            created_at: '2026-04-25T08:45:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-id-8',
            full_name: 'Juliana Mendes',
            cpf: '777.888.999-00',
            protocol: '2026042033',
            projectName: 'Poemas ao Vento',
            created_at: '2026-04-25T11:10:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-id-9',
            full_name: 'Associação Cultural Extremoz',
            cpf: '98.765.432/0001-11',
            protocol: '2026042034',
            projectName: 'Biblioteca Comunitária',
            created_at: '2026-04-25T16:30:00.000Z',
            status: 'CONFIRMADA'
          }
        ];
        
        testInscriptions.forEach(testItem => {
          if (!fetchedData.some(item => item.protocol === testItem.protocol)) {
            fetchedData.push(testItem);
          }
        });
      } else if (view === 'documentacao') {
        const testDocs = [
          {
            id: 'test-doc-1',
            full_name: 'João da Silva',
            cpf: '123.456.789-00',
            protocol: '2026042026',
            projectName: 'Poesia na Praça',
            created_at: '2026-04-25T14:30:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-doc-2',
            full_name: 'Maria Souza',
            cpf: '222.333.444-55',
            protocol: '2026042027',
            projectName: 'Contos de Extremoz',
            created_at: '2026-04-26T10:15:00.000Z',
            status: 'CONFIRMADA'
          },
          {
            id: 'test-doc-3',
            full_name: 'Carlos Lima Ltda',
            cpf: '12.345.678/0001-99',
            protocol: '2026042030',
            projectName: 'Feira Literária',
            created_at: '2026-04-27T11:30:00.000Z',
            status: 'CONFIRMADA'
          }
        ];

        testDocs.forEach(testItem => {
          if (!fetchedData.some(item => item.protocol === testItem.protocol)) {
            fetchedData.push(testItem);
          }
        });
      } else if (view === 'recursos') {
        const testRecursos = [
          {
            id: 'test-rec-1',
            full_name: 'Pedro Santos',
            cpf: '333.444.555-66',
            protocol: '2026042028',
            projectName: 'Teatro de Bonecos',
            created_at: '2026-04-28T16:45:00.000Z',
            status: 'PENDENTE'
          }
        ];

        testRecursos.forEach(testItem => {
          if (!fetchedData.some(item => item.protocol === testItem.protocol)) {
            fetchedData.push(testItem);
          }
        });
      }
    }

    setData(fetchedData);
    setFetching(false);
  };

  useEffect(() => {
    if (activeView !== 'overview') {
      fetchData(activeView);
    }
  }, [activeView, id]);

  // Escuta eventos de storage para atualizar a lista instantaneamente quando houver novos envios
  useEffect(() => {
    const handleStorageChange = () => {
      if (activeView !== 'overview') {
        fetchData(activeView);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [activeView, id]);

  const handleStatusChange = async (protocol: string, newStatus: string, itemId: string, cpfCnpj: string) => {
    const cleanCpfCnpj = cpfCnpj ? cpfCnpj.replace(/\D/g, '') : '';
    if (cleanCpfCnpj) {
      localStorage.setItem(`status_by_cpfcnpj_${cleanCpfCnpj}`, newStatus);
    }
    localStorage.setItem(`inscription_status_${protocol}`, newStatus);
    
    if (itemId !== 'test-id' && !itemId.startsWith('test-id-') && !itemId.startsWith('test-doc-') && !itemId.startsWith('local-')) {
      try {
        await supabase
          .from('inscricoes')
          .update({ status: newStatus })
          .eq('id', itemId);
          
        await supabase
          .from('documentacao')
          .update({ status: newStatus })
          .eq('cpf', cpfCnpj);
      } catch (e) {
        console.error("Erro ao atualizar status no banco:", e);
      }
    }

    setData(prev => prev.map(item => {
      const itemCleanCpfCnpj = item.cpf ? item.cpf.replace(/\D/g, '') : '';
      if (itemCleanCpfCnpj === cleanCpfCnpj || item.protocol === protocol) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
    toast.success("Status atualizado com sucesso!");
    window.dispatchEvent(new Event('storage'));
  };

  const filteredData = data.filter(item => {
    const cleanSearch = searchTerm.replace(/\D/g, '').toLowerCase();
    const itemCpfClean = item.cpf ? item.cpf.replace(/\D/g, '') : '';
    
    const matchesSearch = item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.protocol.includes(searchTerm) ||
                         (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (cleanSearch && itemCpfClean.includes(cleanSearch)) ||
                         item.cpf.includes(searchTerm);
    
    const itemDate = new Date(item.created_at);
    const matchesDate = (!dateRange.from || itemDate >= dateRange.from) &&
                       (!dateRange.to || itemDate <= dateRange.to);

    return matchesSearch && matchesDate;
  });

  const getEmptyMessage = () => {
    if (activeView === 'inscricoes') return "Nenhuma Inscrição";
    if (activeView === 'recursos') return "Nenhum Recurso";
    if (activeView === 'documentacao') return "Nenhuma Documentação";
    return "Nenhum registro encontrado";
  };

  const isCNPJ = (val: string) => val.replace(/\D/g, '').length > 11;

  const handleViewFiles = (item: any) => {
    const mockFiles = item.files && item.files.length > 0 ? item.files : [
      { name: 'Documento_Identificacao.pdf', size: '1.2 MB' },
      { name: 'Projeto_Cultural.pdf', size: '3.5 MB' },
      { name: 'Comprovante_Residencia.pdf', size: '0.8 MB' }
    ];
    setSelectedFiles(mockFiles);
  };

  const getStatusValue = (item: any) => {
    const cleanCpfCnpj = item.cpf ? item.cpf.replace(/\D/g, '') : '';
    const savedByCpfCnpj = cleanCpfCnpj ? localStorage.getItem(`status_by_cpfcnpj_${cleanCpfCnpj}`) : null;
    if (savedByCpfCnpj) return savedByCpfCnpj;

    const saved = localStorage.getItem(`inscription_status_${item.protocol}`) || item.status || 'CONFIRMADA';
    if (saved === 'Inscrição CONFIRMADA') return 'CONFIRMADA';
    if (saved === 'Enviar DOCUMENTAÇÃO') return 'DOCUMENTAÇÃO';
    return saved;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <AdminSidebar />
      
      <main className="flex-grow flex flex-col">
        <AdminHeader title={`Edital #${id?.substring(0, 8)}`} />

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Cabeçalho Responsivo */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/inscricoes')} className="rounded-xl shrink-0">
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Gestão de Propostas</h1>
              <p className="text-xs text-slate-400">Acompanhamento detalhado do edital</p>
            </div>
          </div>

          {/* Ações de Gestão */}
          <div className="bg-white p-6 md:p-10 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center sm:text-left">Ações de Gestão</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                onClick={() => setActiveView('inscricoes')}
                className={`h-20 sm:h-24 rounded-xl flex flex-col gap-2 font-bold transition-all ${
                  activeView === 'inscricoes' 
                    ? 'bg-blue-600 text-white shadow-xl' 
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileText size={22} />
                Inscrições
              </Button>
              
              <Button 
                onClick={() => setActiveView('recursos')}
                className={`h-20 sm:h-24 rounded-xl flex flex-col gap-2 font-bold transition-all ${
                  activeView === 'recursos' 
                    ? 'bg-red-600 text-white shadow-xl' 
                    : 'bg-white border border-rose-100 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <AlertTriangle size={22} />
                Recursos
              </Button>
              
              <Button 
                onClick={() => setActiveView('documentacao')}
                className={`h-20 sm:h-24 rounded-xl flex flex-col gap-2 font-bold transition-all ${
                  activeView === 'documentacao' 
                    ? 'bg-emerald-600 text-white shadow-xl' 
                    : 'bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <Folder size={22} />
                Documentação
              </Button>
            </div>
          </div>

          {/* Lista de Propostas */}
          {activeView !== 'overview' && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              
              {/* Filtros e Busca */}
              <div className="p-6 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900 text-center lg:text-left">
                  {activeView === 'inscricoes' ? 'Lista de Inscrições' : 
                   activeView === 'recursos' ? 'Lista de Recursos' : 'Lista de Documentações'}
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <div className="relative w-full sm:flex-grow lg:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      placeholder="Pesquisar por nome, projeto, CPF ou CNPJ..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-slate-200 text-center sm:text-left"
                    />
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto h-11 rounded-xl border-slate-200 flex gap-2 text-slate-600 font-medium justify-center">
                        <CalendarIcon size={18} />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd/MM")} - {format(dateRange.to, "dd/MM")}
                            </>
                          ) : (
                            format(dateRange.from, "dd/MM/yyyy")
                          )
                        ) : (
                          "Filtrar Período"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-xl" align="end">
                      <Calendar
                        initialFocus
                        mode="range"
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range: any) => setDateRange({ from: range?.from, to: range?.to })}
                        numberOfMonths={1}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Versão Desktop: Tabela */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-slate-900">Nome do Projeto</TableHead>
                      <TableHead className="font-bold text-slate-900">Proponente</TableHead>
                      <TableHead className="font-bold text-slate-900">CPF</TableHead>
                      <TableHead className="font-bold text-slate-900">CNPJ</TableHead>
                      <TableHead className="font-bold text-slate-900">Protocolo</TableHead>
                      <TableHead className="font-bold text-slate-900">Data e Hora de Envio</TableHead>
                      {(activeView === 'inscricoes' || activeView === 'documentacao') && (
                        <TableHead className="font-bold text-slate-900">Status</TableHead>
                      )}
                      <TableHead className="font-bold text-slate-900">Arquivos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={activeView === 'inscricoes' || activeView === 'documentacao' ? 8 : 7} className="text-center py-20 text-slate-400 font-medium">
                          {getEmptyMessage()}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((item) => (
                        <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-bold text-slate-900">{item.projectName || 'Sem Projeto'}</TableCell>
                          <TableCell className="font-bold text-slate-900">{item.full_name}</TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {!isCNPJ(item.cpf) ? item.cpf : '-'}
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {isCNPJ(item.cpf) ? item.cpf : '-'}
                          </TableCell>
                          <TableCell className="text-sm font-mono text-blue-600">{item.protocol}</TableCell>
                          <TableCell className="text-sm text-slate-600">
                            <div className="flex flex-col">
                              <span className="font-bold">{new Date(item.created_at).toLocaleDateString('pt-BR')}</span>
                              <span className="text-[10px] text-slate-400">{new Date(item.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </TableCell>
                          {(activeView === 'inscricoes' || activeView === 'documentacao') && (
                            <TableCell>
                              <Select 
                                value={getStatusValue(item)} 
                                onValueChange={(val) => handleStatusChange(item.protocol, val, item.id, item.cpf)}
                              >
                                <SelectTrigger className={`w-[180px] h-10 rounded-xl border-slate-200 font-bold text-xs ${
                                  getStatusValue(item) === 'APROVADO' ? 'text-emerald-600 border-emerald-200 bg-emerald-50/30' : ''
                                }`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="CONFIRMADA" className="text-emerald-600 font-bold">
                                    CONFIRMADA
                                  </SelectItem>
                                  <SelectItem value="DOCUMENTAÇÃO" className="text-amber-600 font-bold">
                                    DOCUMENTAÇÃO
                                  </SelectItem>
                                  <SelectItem value="APROVADO" className="text-emerald-600 font-bold">
                                    APROVADO
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          )}
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleViewFiles(item)}
                              className="rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 h-10 w-10"
                            >
                              <Eye size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Versão Mobile: Cartões Elegantes */}
              <div className="block md:hidden p-4 space-y-4">
                {filteredData.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 font-medium">
                    {getEmptyMessage()}
                  </div>
                ) : (
                  filteredData.map((item) => (
                    <div key={item.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{item.projectName || 'Sem Projeto'}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Proponente: {item.full_name}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewFiles(item)}
                          className="rounded-xl bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-600 h-10 w-10 border border-slate-100 shrink-0"
                        >
                          <Eye size={18} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200/60 pt-3">
                        <div>
                          <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Documento</p>
                          <p className="font-medium text-slate-700 mt-0.5">{item.cpf}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Protocolo</p>
                          <p className="font-mono font-bold text-blue-600 mt-0.5">{item.protocol}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Data de Envio</p>
                          <p className="font-medium text-slate-700 mt-0.5">
                            {new Date(item.created_at).toLocaleDateString('pt-BR')} às {new Date(item.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      {(activeView === 'inscricoes' || activeView === 'documentacao') && (
                        <div className="border-t border-slate-200/60 pt-3">
                          <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mb-1.5">Status da Proposta</p>
                          <Select 
                            value={getStatusValue(item)} 
                            onValueChange={(val) => handleStatusChange(item.protocol, val, item.id, item.cpf)}
                          >
                            <SelectTrigger className={`w-full h-11 rounded-xl border-slate-200 bg-white font-bold text-xs ${
                              getStatusValue(item) === 'APROVADO' ? 'text-emerald-600 border-emerald-200 bg-emerald-50/30' : ''
                            }`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="CONFIRMADA" className="text-emerald-600 font-bold">
                                CONFIRMADA
                              </SelectItem>
                              <SelectItem value="DOCUMENTAÇÃO" className="text-amber-600 font-bold">
                                DOCUMENTAÇÃO
                              </SelectItem>
                              <SelectItem value="APROVADO" className="text-emerald-600 font-bold">
                                APROVADO
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>

        {/* Diálogo de Arquivos */}
        <Dialog open={!!selectedFiles} onOpenChange={(open) => !open && setSelectedFiles(null)}>
          <DialogContent className="max-w-md rounded-[2.5rem] p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-slate-900">Arquivos Anexados</DialogTitle>
              <p className="text-slate-500 text-sm font-medium mt-1">
                {activeView === 'inscricoes' ? 'Documentos da Inscrição' : 
                 activeView === 'recursos' ? 'Documentos do Recurso' : 'Documentos da Documentação'}
              </p>
            </DialogHeader>

            <div className="space-y-3">
              {selectedFiles?.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText size={20} className="text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{file.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                    <Download size={18} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button onClick={() => setSelectedFiles(null)} className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-xl font-bold">
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminEditalDetalhes;