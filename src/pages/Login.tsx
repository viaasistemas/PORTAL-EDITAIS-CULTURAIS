"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const { session, loginFake } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/admin');
    }
  }, [session, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação simples: qualquer senha funciona para o admin
    if (email === 'admin@cultura.gov.br') {
      loginFake();
      toast.success("Login realizado com sucesso!");
      navigate('/admin');
    } else {
      toast.error("Credenciais inválidas para o modo de teste.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">CE</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Acesso Administrativo</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Entre com suas credenciais de acesso</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</Label>
              <Input 
                type="email" 
                placeholder="admin@cultura.gov.br" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-slate-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Senha</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-slate-200"
                required
              />
            </div>
            <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 transition-all active:scale-95">
              Entrar no Sistema
            </Button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Modo de Teste</p>
            <p className="text-xs text-blue-800 font-medium">Use o e-mail <strong>admin@cultura.gov.br</strong> para acessar.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;