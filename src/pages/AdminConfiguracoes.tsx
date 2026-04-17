"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from 'lucide-react';
import { toast } from 'sonner';

const AdminConfiguracoes = () => {
  const { session, loading, profilePhoto, updateProfilePhoto } = useSession();
  const navigate = useNavigate();
  const [tempPhoto, setTempPhoto] = useState<string | null>(profilePhoto);

  useEffect(() => {
    if (!loading && !session) navigate('/login');
  }, [session, loading, navigate]);

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
        <AdminHeader title="Configurações" />

        <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-8">
          <div className="bg-white p-6 md:p-10 rounded-xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Perfil do Administrador</h1>
            <p className="text-slate-500 text-lg mb-10">Gerencie suas informações e preferências do sistema.</p>

            <div className="space-y-10">
              <div className="flex flex-col items-center sm:flex-row gap-8">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-xl">
                    <AvatarImage src={tempPhoto || ''} className="rounded-xl" />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold rounded-xl">AD</AvatarFallback>
                  </Avatar>
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
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
                  <Input value={session.user.email} disabled className="h-14 rounded-xl bg-slate-50 border-slate-200 text-lg font-medium" />
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={handleSave} className="w-full sm:w-auto h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xl shadow-xl flex gap-3">
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