"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Settings, 
  LogOut,
  FileText,
  LayoutDashboard,
  Book,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-admin-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleToggle);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair.");
    } else {
      navigate('/login');
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Painel", path: "/admin" },
    { icon: FileText, label: "Inscrições", path: "/admin/inscricoes" },
    { icon: Book, label: "Conteúdo", path: "/admin/conteudo" },
  ];

  return (
    <>
      {/* Overlay para mobile quando aberto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`bg-white border-r border-slate-200 flex flex-col py-8 transition-all duration-300 sticky top-0 h-screen z-50 ${
          isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-0 lg:opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
              CE
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-slate-900 leading-none truncate">Cultura Extremoz</h2>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Admin</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2 px-4 flex-grow">
          {menuItems.map((item) => {
            const isActive = item.path === "/admin" 
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.path);

            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <item.icon size={22} className="shrink-0" />
                <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
          
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link 
              to="/admin/configuracoes"
              className={`flex items-center gap-4 p-3 rounded-xl transition-all text-slate-400 hover:bg-slate-50 hover:text-blue-600 ${
                location.pathname === '/admin/configuracoes' ? 'bg-slate-100 text-blue-600' : ''
              }`}
            >
              <Settings size={22} className="shrink-0" />
              <span className="font-bold text-sm whitespace-nowrap">Configurações</span>
            </Link>
          </div>
        </nav>

        <div className="px-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group"
          >
            <LogOut size={22} className="shrink-0 group-hover:translate-x-1 transition-transform" />
            <span className="font-bold text-sm whitespace-nowrap">Sair do Sistema</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;