"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';

// Importando os ícones de imagem
import iconMusica from '@/assets/icon-musica.png';
import iconVisuais from '@/assets/icon-visuais.png';
import iconCenicas from '@/assets/icon-cenicas.png';
import iconAudiovisual from '@/assets/icon-audiovisual.png';
import iconLiteratura from '@/assets/icon-literatura.png';
import iconArtesanato from '@/assets/icon-artesanato.png';
import iconPopular from '@/assets/icon-popular.png';
import iconProdutor from '@/assets/icon-produtor.png';
import heroFull from '@/assets/hero-full.png';

const Index = () => {
  const categories = [
    { imageIcon: iconMusica, title: "Música", description: "Produção, shows e formação musical. Estímulo à produção cultural brasileira em seus diferentes segmentos e à circulação de projetos." },
    { imageIcon: iconVisuais, title: "Artes Visuais", description: "Exposições, murais e arte digital. Projetos que mobilizam grande público e realizadores de todo o país valorizando a cultura regional." },
    { imageIcon: iconCenicas, title: "Artes Cênicas", description: "Teatro, dança, circo e performance. Abrange a criação, produção e apresentação de projetos culturais para os mais diversos públicos." },
    { imageIcon: iconAudiovisual, title: "Audiovisual", description: "Cinema, documentários e web séries. Fomento à produção de conteúdo audiovisual e novas mídias digitais." },
    { imageIcon: iconLiteratura, title: "Literatura", description: "Publicação, contação de histórias e poesia. Incentivo à leitura e à produção literária local e regional." },
    { imageIcon: iconPopular, title: "Cultura Popular", description: "Folclore, tradições e manifestações populares que valorizam a identidade e a história da nossa gente." },
    { imageIcon: iconArtesanato, title: "Artesanato", description: "Produção e comercialização de arte manual. Apoio aos artesãos e às técnicas tradicionais do Rio Grande do Norte." },
    { imageIcon: iconProdutor, title: "Produtor Cultural", description: "Gestão, produção e curadoria de eventos. Capacitação e suporte para profissionais da cadeia produtiva da cultura." },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-0 overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-[#2b59c3]">
            Transforme sua ideia em <br />
            <span className="text-[#f9b233] italic font-serif">Realidade</span>
          </h1>
          <p className="text-base md:text-lg text-slate-900 mb-8 max-w-2xl mx-auto font-bold">
            O Portal de Editais Culturais de Extremoz-RN é a sua ponte para oportunidades, fomento e reconhecimento.
          </p>
          <Link to="/editais">
            <Button className="bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold px-10 py-7 text-base rounded-xl shadow-lg shadow-blue-100 transition-all mb-12">
              Inscreva-se em nossos editais
            </Button>
          </Link>
        </div>

        {/* Ilustração do Hero */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <img src={heroFull} alt="Cultura Extremoz" className="w-full h-auto object-contain" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Oportunidades para Todos os Artistas</h2>
            <div className="flex justify-center gap-1 mb-6">
              <div className="w-8 h-1 bg-blue-600 rounded-full" />
              <div className="w-8 h-1 bg-yellow-400 rounded-full" />
              <div className="w-8 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-[#2b59c3] max-w-2xl mx-auto text-sm font-bold">Encontre editais em diversas áreas e impulsione sua carreira cultural.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <CategoryCard key={index} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2b59c3] mb-4">Investimento</h2>
            <div className="flex justify-center gap-1">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div className="space-y-2">
              <p className="text-5xl font-bold text-[#2b59c3] tracking-tighter">R$ 1.5M+</p>
              <p className="text-[#2b59c3] font-bold uppercase tracking-widest text-[10px]">Em recursos distribuídos</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-[#f9b233] tracking-tighter">500+</p>
              <p className="text-[#2b59c3] font-bold uppercase tracking-widest text-[10px]">Artistas e projetos apoiados</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-[#10b981] tracking-tighter">30+</p>
              <p className="text-[#2b59c3] font-bold uppercase tracking-widest text-[10px]">Editais lançados</p>
            </div>
          </div>
        </div>
        
        {/* Wavy Border Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20 fill-[#2b59c3]">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,0V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 bg-[#2b59c3] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-100">
            <Search className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2b59c3] mb-4">Acompanhe sua Inscrição</h2>
          <div className="flex justify-center gap-1 mb-8">
            <div className="w-8 h-1 bg-blue-600 rounded-full" />
            <div className="w-8 h-1 bg-yellow-400 rounded-full" />
            <div className="w-8 h-1 bg-red-500 rounded-full" />
          </div>
          <p className="text-[#2b59c3] mb-10 text-sm font-bold leading-relaxed">
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