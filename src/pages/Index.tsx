"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Importando os ícones e as imagens de fundo
import iconMusica from '@/assets/icon-musica.png';
import iconVisuais from '@/assets/icon-visuais.png';
import iconCenicas from '@/assets/icon-cenicas.png';
import iconAudiovisual from '@/assets/icon-audiovisual.png';
import iconLiteratura from '@/assets/icon-literatura.png';
import iconArtesanato from '@/assets/icon-artesanato.png';
import iconPopular from '@/assets/icon-popular.png';
import iconProdutor from '@/assets/icon-produtor.png';
import heroBg from '@/assets/hero-bg.png';
import investimentoBg from '@/assets/investimento-bg.png';

const Index = () => {
  const isMobile = useIsMobile();
  
  const categories = [
    { imageIcon: iconMusica, title: "Música", description: "Produção, shows e formation musical. Estímulo à produção cultural brasileira em seus diferentes segmentos e à circulação de projetos." },
    { imageIcon: iconVisuais, title: "Artes Visuais", description: "Exposições, murais e arte digital. Projetos que mobilizam grande público e realizadores de todo o país valorizando a cultura regional." },
    { imageIcon: iconCenicas, title: "Artes Cênicas", description: "Teatro, dança, circo e performance. Abrange a criação, production e apresentação de projetos culturais para os mais diversos públicos." },
    { imageIcon: iconAudiovisual, title: "Audiovisual", description: "Cinema, documentários e web séries. Fomento à produção de conteúdo audiovisual e novas mídias digitais." },
    { imageIcon: iconLiteratura, title: "Literatura", description: "Publicação, contação de histórias e poesia. Incentivo à leitura e à produção literária local e regional." },
    { imageIcon: iconPopular, title: "Cultura Popular", description: "Folclore, tradições e manifestações populares que valorizam a identidade e a história da nossa gente." },
    { imageIcon: iconArtesanato, title: "Artesanato", description: "Produção e comercialização de arte manual. Apoio aos artesãos e às técnicas tradicionais do Rio Grande do Norte." },
    { imageIcon: iconProdutor, title: "Produtor Cultural", description: "Gestão, production e curadoria de eventos. Capacitação e suporte para profissionais da cadeia produtiva da cultura." },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden min-h-screen flex items-center bg-slate-50 md:bg-transparent">
        {/* Background Image - Hidden on Mobile */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover object-center" 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl -mt-24 md:-mt-36">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-[#2b59c3]">
            Transforme sua ideia em <br />
            <span className="text-[#f9b233] italic font-serif">Realidade</span>
          </h1>
          <p className="text-base md:text-lg text-slate-900 mb-8 max-w-2xl mx-auto font-bold">
            O Portal de Editais Culturais de Extremoz-RN é a sua ponte para oportunidades, fomento e reconhecimento.
          </p>
          <Link to="/editais">
            <Button className="bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold px-10 py-7 text-base rounded-xl shadow-lg shadow-blue-100 transition-all">
              Inscreva-se em nossos editais
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Oportunidades para Todos os Artistas</h2>
            <div className="flex justify-center gap-1 mb-6">
              <div className="w-8 h-1 bg-blue-600 rounded-full" />
              <div className="w-8 h-1 bg-yellow-400 rounded-full" />
              <div className="w-8 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">Encontre editais em diversas áreas e impulsione sua carreira cultural.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <CategoryCard key={index} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden bg-slate-50/30">
        {/* Background Image matching the reference */}
        <div className="absolute inset-0 z-0">
          <img 
            src={investimentoBg} 
            alt="Investimento Background" 
            className="w-full h-full object-cover object-center" 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2b59c3] mb-4">Investimento</h2>
            <div className="flex justify-center gap-1.5">
              <div className="w-10 h-1 bg-[#2b59c3] rounded-full" />
              <div className="w-10 h-1 bg-[#f9b233] rounded-full" />
              <div className="w-10 h-1 bg-[#2e7d32] rounded-full" />
              <div className="w-10 h-1 bg-[#d32f2f] rounded-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto items-center">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-black text-[#2b59c3] tracking-tight">R$ 1.5M+</p>
              <p className="text-[#5c7699] font-bold uppercase tracking-wider text-[11px]">Em recursos distribuídos</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-black text-[#f9b233] tracking-tight">500+</p>
              <p className="text-[#5c7699] font-bold uppercase tracking-wider text-[11px]">Artistas e projetos apoiados</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-black text-[#2e7d32] tracking-tight">30+</p>
              <p className="text-[#5c7699] font-bold uppercase tracking-wider text-[11px]">Editais lançados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 bg-[#2b59c3] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-100">
            <Search className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Acompanhe sua Inscrição</h2>
          <div className="flex justify-center gap-1 mb-8">
            <div className="w-8 h-1 bg-blue-600 rounded-full" />
            <div className="w-8 h-1 bg-yellow-400 rounded-full" />
            <div className="w-8 h-1 bg-red-500 rounded-full" />
          </div>
          <p className="text-slate-500 mb-10 text-lg font-medium leading-relaxed">
            Utilize o número de protocolo para acompanhar a sua inscrição e ver o status do seu projeto em tempo real.
          </p>
          <Link to="/inscricoes">
            <Button className="bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold px-12 py-7 text-base rounded-xl shadow-xl shadow-blue-100 transition-all flex items-center gap-3 mx-auto">
              VER INSCRIÇÕES
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;