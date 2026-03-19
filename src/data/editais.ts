export interface EditalDetail {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  valorTotal: string;
  valorMaximo: string;
  inicioInscricao: string;
  terminoInscricao: string;
  etapas: string[];
  requisitos: string;
  documentos: string;
  status: 'Aberto' | 'Encerrado';
  tipo: 'PNAB' | 'LPG' | 'FM';
  prazoAtual: string;
  vagas: string;
}

export const editaisData: EditalDetail[] = [
  {
    id: "3",
    number: "3",
    title: "PNAB - Fomento Cultura Popular 2026",
    subtitle: "Apoio financeiro para grupos populares, e coletivos da Política Nacional Aldir Blanc.",
    description: "Apoio financeiro para grupos populares, e coletivos da Política Nacional Aldir Blanc.",
    categories: ["Cultura", "Dança", "Grupos"],
    valorTotal: "R$ 150.000,00",
    valorMaximo: "R$ 15.000,00",
    inicioInscricao: "05/03/2026",
    terminoInscricao: "05/04/2026",
    etapas: ["1. Inscrição online", "2. Análise documental", "3. Avaliação técnica", "4. Resultado final"],
    requisitos: "Ser maior de 18 anos, residir no estado.",
    documentos: "RG, CPF, Comprovante de residência.",
    status: "Aberto",
    tipo: "PNAB",
    prazoAtual: "PERÍODO DE INSCRIÇÃO",
    vagas: "10"
  },
  {
    id: "2",
    number: "2",
    title: "PNAB - Fomento às Artes Cênicas 2026",
    subtitle: "Apoio a grupos teatrais e companhias de dança",
    description: "Edital específico da Política Nacional Aldir Blanc para fomento às artes cênicas.",
    categories: ["Teatro", "Dança", "Circo", "Performance"],
    valorTotal: "R$ 2.000.000,00",
    valorMaximo: "R$ 50.000,00",
    inicioInscricao: "15/03/2024",
    terminoInscricao: "15/05/2024",
    etapas: ["1. Inscrição online", "2. Análise documental", "3. Avaliação técnica", "4. Resultado final"],
    requisitos: "Grupo constituído há pelo menos 2 anos...",
    documentos: "Estatuto social, projeto cultural...",
    status: "Aberto",
    tipo: "PNAB",
    prazoAtual: "EM ANÁLISE",
    vagas: "N/A"
  },
  {
    id: "1",
    number: "1",
    title: "PNAB - Música Popular Brasileira 2024",
    subtitle: "Incentivo à produção musical brasileira",
    description: "Programa de apoio à música popular brasileira.",
    categories: ["MPB", "Regional"],
    valorTotal: "R$ 1.500.000,00",
    valorMaximo: "R$ 35.000,00",
    inicioInscricao: "01/04/2024",
    terminoInscricao: "30/05/2024",
    etapas: ["1. Inscrição digital", "2. Avaliação", "3. Resultado"],
    requisitos: "Artista com produção musical comprovada...",
    documentos: "Projeto musical, orçamento...",
    status: "Encerrado",
    tipo: "PNAB",
    prazoAtual: "ENCERRADO",
    vagas: "N/A"
  }
];