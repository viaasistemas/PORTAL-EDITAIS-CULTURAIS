"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  Book, 
  Settings, 
  Menu,
  LogOut,
  FileText,
  LayoutDashboard
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col py-8 transition-all duration-300">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
          CE
        </div>
        <div className="hidden lg:block overflow-hidden">
          <h2 className="text-sm font-bold text-slate-900 leading-none truncate">Cultura Extremoz</h2>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">Admin</p>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 px-4 flex-grow">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
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
              <span className="hidden lg:block font-bold text-sm">{item.label}</span>
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
            <span className="hidden lg:block font-bold text-sm">Configurações</span>
          </Link>
        </div>
      </nav>

      <div className="px-4 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group"
        >
          <LogOut size={22} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          <span className="hidden lg:block font-bold text-sm">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;