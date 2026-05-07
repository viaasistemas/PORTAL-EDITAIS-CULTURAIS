"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight
} from 'lucide-react';
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
import iconLupa from '@/assets/icon-search-lupa.png';

const Index = () => {
  const categories = [
    { 
      imageIcon: iconMusica, 
      title: "Música", 
      description: "Produção, shows e formação musical. Estímulo à produção cultural brasileira em seus diferentes segmentos e à circulação de projetos." 
    },
    { 
      imageIcon: iconVisuais, 
      title: "Artes Visuais", 
      description: "Exposições, murais e arte digital. Projetos que mobilizam grande público e realizadores de todo o país valorizando a cultura regional." 
    },
    { 
      imageIcon: iconCenicas, 
      title: "Artes Cênicas", 
      description: "Teatro, dança, circo e performance. Abrange a criação, produção e apresentação de projetos culturais para os mais diversos públicos." 
    },
    { 
      imageIcon: iconAudiovisual, 
      title: "Audiovisual", 
      description: "Cinema, documentários e web séries. Fomento à produção de conteúdo audiovisual e novas mídias digitais." 
    },
    { 
      imageIcon: iconLiteratura, 
      title: "Literatura", 
      description: "Publicação, contação de histórias e poesia. Incentivo à leitura e à produção literária local e regional." 
    },
    { 
      imageIcon: iconPopular, 
      title: "Cultura Popular", 
      description: "Folclore, tradições e manifestações populares que valorizam a identidade e a história da nossa gente." 
    },
    { 
      imageIcon: iconArtesanato, 
      title: "Artesanato", 
      description: "Produção e comercialização de arte manual. Apoio aos artesãos locais e preservação de técnicas tradicionais." 
    },
    { 
      imageIcon: iconProdutor, 
      title: "Produtor Cultural", 
      description: "Gestão, produção e curadoria de eventos. Capacitação e suporte para profissionais da cadeia produtiva da cultura." 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1600&auto=format&fit=crop" 
            alt="Cultura Extremoz" 
            className="w-full h-full object-cover brightness-[0.45] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            Transforme sua ideia em <span className="text-blue-400">Realidade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100/90 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            O Portal de Editais Culturais de Extremoz-RN é a sua ponte para oportunidades, fomento e reconhecimento.
          </p>
          <Link to="/editais">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-8 text-lg rounded-xl shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
              EDITAIS ABERTOS
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-20 -mt-20 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Oportunidades para Todos os Artistas</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Encontre editais em diversas áreas e impulsione sua carreira cultural.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((cat, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex">
                <CategoryCard {...cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Investimento</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <p className="text-5xl font-bold text-blue-600 tracking-tighter">R$ 1.5M+</p>
              <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Em recursos distribuídos</p>
            </div>
            <div className="space-y-3">
              <p className="text-5xl font-bold text-blue-600 tracking-tighter">500+</p>
              <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Artistas e projetos apoiados</p>
            </div>
            <div className="space-y-3">
              <p className="text-5xl font-bold text-blue-600 tracking-tighter">30+</p>
              <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Editais lançados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-2xl mb-8 p-4">
            <img src={iconLupa} alt="Acompanhar Inscrição" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Acompanhe sua Inscrição</h2>
          <p className="text-gray-500 mb-10 text-lg font-medium leading-relaxed">
            Utilize o número de protocolo para acompanhar a sua inscrição e ver o status do seu projeto em tempo real.
          </p>
          <Link to="/inscricoes">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-8 text-lg rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center gap-3 mx-auto hover:scale-105 active:scale-95">
              VER INSCRIÇÕES
              <ArrowRight size={22} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;