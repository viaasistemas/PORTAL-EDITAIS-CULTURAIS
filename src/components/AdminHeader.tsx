"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from './SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AdminHeaderProps {
  title: string;
}

const AdminHeader = ({ title }: AdminHeaderProps) => {
  const { profilePhoto } = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('inscricoes')
        .select('full_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (!error && data) {
        setNotifications(data);
      }
    };

    fetchNotifications();
    
    // Realtime subscription for new inscriptions
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'inscricoes' },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev].slice(0, 5));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-500 hover:bg-slate-50 rounded-xl">
          <Menu size={24} />
        </Button>
        <h2 className="text-lg font-bold text-slate-900 leading-none hidden sm:block">{title}</h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-slate-500">
            Olá, <span className="font-bold text-slate-900">Administrador</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-slate-400 hover:text-blue-600 transition-colors relative p-2">
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 rounded-xl shadow-2xl border-slate-100" align="end">
              <div className="p-4 border-b border-slate-50">
                <h3 className="font-bold text-slate-900">Notificações</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div key={i} className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <p className="text-sm font-bold text-slate-900">{n.full_name}</p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Nova inscrição em {new Date(n.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    Nenhuma notificação recente.
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-blue-600 p-0.5 rounded-xl">
            <AvatarImage src={profilePhoto || ''} className="rounded-xl" />
            <AvatarFallback className="bg-blue-600 text-white text-xs font-bold rounded-xl">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;