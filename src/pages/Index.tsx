"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, 
  Palette, 
  Theater, 
  Film, 
  Book, 
  Users, 
  Hammer, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const categories = [
    { icon: Music, title: "Música", description: "Produção, shows e formação musical." },
    { icon: Palette, title: "Artes Visuais", description: "Exposições, murais e arte digital." },
    { icon: Theater, title: "Artes Cênicas", description: "Teatro, dança, circo e performance." },
    { icon: Film, title: "Audiovisual", description: "Cinema, documentários e web séries." },
    { icon: Book, title: "Literatura", description: "Publicação, contação de histórias e poesia." },
    { icon: Users, title: "Cultura Popular", description: "Folclore, tradições e manifestações populares." },
    { icon: Hammer, title: "Artesanato", description: "Produção e comercialização de arte manual." },
    { icon: Briefcase, title: "Produtor Cultural", description: "Gestão, produção e curadoria de eventos." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/hero-bg.png" 
            alt="Cultura Extremoz" 
            className="w-full h-full object-cover brightness-[0.45] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            Transforme sua ideia em <span className="text-yellow-400">Realidade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100/90 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            O Portal de Editais Culturais de Extremoz-RN é a sua ponte para oportunidades, fomento e reconhecimento.
          </p>
          <Link to="/editais">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold px-12 py-8 text-lg rounded-2xl shadow-2xl shadow-yellow-400/30 transition-all hover:scale-105 active:scale-95">
              EDITAIS ABERTOS
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Oportunidades para Todos os Artistas</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Encontre editais em diversas áreas e impulsione sua carreira cultural.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <CategoryCard key={index} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
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
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-8">
            <Users className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Acompanhe sua Inscrição</h2>
          <p className="text-gray-500 mb-12 text-lg font-medium leading-relaxed">
            Utilize o número de protocolo para acompanhar a sua inscrição e ver o status do seu projeto em tempo real.
          </p>
          <Link to="/inscricoes">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-8 text-lg rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center gap-3 mx-auto hover:scale-105 active:scale-95">
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