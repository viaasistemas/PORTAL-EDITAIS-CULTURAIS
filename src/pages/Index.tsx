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
    { icon: Theater, title: "Artes Cênicas", description: "Teatro, daça, circo e performance." },
    { icon: Film, title: "Audiovisual", description: "Cinema, documentários e web séries." },
    { icon: Book, title: "Literatura", description: "Publicação, contato de histórias e poesia." },
    { icon: Users, title: "Cultura Popular", description: "Folclore, tradições e manifestações populares." },
    { icon: Hammer, title: "Artesanato", description: "Produção e comercialização de arte manual." },
    { icon: Briefcase, title: "Produtor Cultural", description: "Gestão, produção e curadoria de eventos." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/hero-bg.png" 
            alt="Cultura Extremoz" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Transforme sua ideia em <span className="text-yellow-400">Realidade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
            O Portal de Editais Culturais de Extremoz-RN é a sua ponte para oportunidades, fomento e reconhecimento.
          </p>
          <Link to="/editais">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black px-10 py-7 text-lg rounded-xl shadow-xl shadow-yellow-400/20 transition-all hover:scale-105">
              EDITAIS ABERTOS
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Oportunidades para Todos os Artistas</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Encontre editais em diversas áreas e impulsione sua carreira cultural.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <CategoryCard key={index} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600">R$ 1.5M+</p>
              <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">Em recursos distribuídos</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600">500+</p>
              <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">Artistas e projetos apoiados</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600">30+</p>
              <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">Editais lançados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Acompanhe sua Inscrição</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Utilize o número de protocolo para acompanhar a sua inscrição e ver o status do seu projeto.
          </p>
          <Link to="/inscricoes">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-7 text-lg rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-3 mx-auto">
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