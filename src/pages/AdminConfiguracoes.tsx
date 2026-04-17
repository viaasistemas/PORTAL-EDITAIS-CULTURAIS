"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Menu, Bell } from 'lucide-react';
import { toast } from 'sonner';

const AdminConfiguracoes = () => {
  const { session, loading, profilePhoto, updateProfilePhoto } = useSession();
  const navigate = useNavigate();
  const [tempPhoto, setTempPhoto] = useState<string | null>(profilePhoto);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempPhoto) {
      updateProfilePhoto(tempPhoto);
      toast.success("Configurações atualizadas com sucesso!");
    }
  };

  if (loading || !session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />

      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10 rounded-none">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-500 hover:bg-slate-50 rounded-none">
              <Menu size={24} />
            </Button>
            <h2 className="text-lg font-bold text-slate-900 leading-none">Configurações</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-500">
                Olá, <span className="font-bold text-slate-900">Administrador</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-blue-600 transition-colors relative">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Avatar className="h-12 w-12 border-2 border-blue-600 p-0.5 rounded-none">
                <AvatarImage src={profilePhoto || ''} className="rounded-none" />
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold rounded-none">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
          <div className="bg-white p-10 rounded-none border border-slate-100 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Perfil do Administrador</h1>
            <p className="text-slate-500 text-lg mb-10">Gerencie suas informações e preferências do sistema.</p>

            <div className="space-y-10">
              <div className="flex flex-col items-center sm:flex-row gap-8">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-none">
                    <AvatarImage src={tempPhoto || ''} className="rounded-none" />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold rounded-none">AD</AvatarFallback>
                  </Avatar>
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-none cursor-pointer shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
                    <Camera size={20} />
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900">Foto de Perfil</h3>
                  <p className="text-slate-500 text-base mt-1">Clique no ícone da câmera para alterar sua foto.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-400 uppercase tracking-widest">E-mail de Acesso</Label>
                  <Input value={session.user.email} disabled className="h-14 rounded-none bg-slate-50 border-slate-200 text-lg font-medium" />
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={handleSave} className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-bold text-xl shadow-xl flex gap-3">
                  <Save size={22} /> Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminConfiguracoes;