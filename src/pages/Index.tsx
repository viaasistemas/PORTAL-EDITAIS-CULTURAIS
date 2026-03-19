"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, Palette, Theater, Film, Book, Users, Hammer, Briefcase, ArrowRight, Sparkles
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
    <div className="min-h-screen bg-[#fafafa] selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section - Modern Asymmetric Layout */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/hero-bg.png" 
            alt="Cultura Extremoz" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-noise" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles size={14} />
              Portal Oficial de Fomento
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
              Transforme sua <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ideia em Arte.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              O Portal de Editais Culturais de Extremoz-RN é a sua ponte para oportunidades, fomento e reconhecimento nacional.
            </p>
            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Link to="/editais">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-8 text-lg rounded-2xl shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
                  Explorar Editais
                </Button>
              </Link>
              <Link to="/biblioteca">
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-8 text-lg rounded-2xl backdrop-blur-md transition-all">
                  Documentação
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 p-12 hidden lg:block">
          <div className="flex items-center gap-4 text-white/40 text-sm font-bold tracking-widest uppercase vertical-text rotate-180">
            <div className="w-px h-24 bg-white/20" />
            Scroll para descobrir
          </div>
        </div>
      </section>

      {/* Categories Section - Bento Grid Style */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Oportunidades para <br />Todos os Artistas
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Encontre editais em diversas áreas e impulsione sua carreira cultural com o apoio da prefeitura.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                <ArrowRight className="rotate-180" size={20} />
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <CategoryCard key={index} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Integrated Design */}
      <section className="py-32 bg-slate-950 relative overflow-hidden rounded-[3rem] mx-4 md:mx-8">
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { label: "Em recursos distribuídos", value: "R$ 1.5M+", color: "text-blue-400" },
              { label: "Artistas e projetos apoiados", value: "500+", color: "text-cyan-400" },
              { label: "Editais lançados", value: "30+", color: "text-indigo-400" },
            ].map((stat, i) => (
              <div key={i} className="group text-center md:text-left">
                <p className={`text-6xl md:text-7xl font-black mb-4 tracking-tighter ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  {stat.value}
                </p>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Section - Minimalist & Focused */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32" />
            
            <div className="flex-1 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                Acompanhe sua <br />Inscrição em tempo real.
              </h2>
              <p className="text-slate-500 text-lg mb-10 font-medium leading-relaxed">
                Transparência é nossa prioridade. Utilize seu número de protocolo para verificar o status do seu projeto e as próximas etapas.
              </p>
              <Link to="/inscricoes">
                <Button className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-12 py-8 text-lg rounded-2xl shadow-xl transition-all flex items-center gap-4 group">
                  Ver Inscrições
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="flex-1 w-full md:w-auto relative z-10">
              <div className="aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6">
                  <Sparkles className="text-blue-600" size={32} />
                </div>
                <p className="text-slate-900 font-bold text-xl mb-2">Protocolo Digital</p>
                <p className="text-slate-400 text-sm">Acesso rápido e seguro aos seus dados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;