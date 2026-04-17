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
import { useSession } from './SessionContextProvider';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { logoutFake } = useSession();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      if (isMobile) {
        setIsOpen(prev => !prev);
      } else {
        setIsCompact(prev => !prev);
      }
    };
    window.addEventListener('toggle-admin-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleToggle);
  }, [isMobile]);

  // Close on mobile when route changes
  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [location.pathname, isMobile]);

  const menuItems = [
    { icon: LayoutDashboard, label: "Painel", path: "/admin" },
    { icon: FileText, label: "Inscrições", path: "/admin/inscricoes" },
    { icon: Book, label: "Conteúdo", path: "/admin/conteudo" },
  ];

  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
    : `bg-white border-r border-slate-200 flex flex-col py-8 transition-all duration-300 sticky top-0 h-screen z-50 ${isCompact ? 'w-24' : 'w-72'}`;

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={sidebarClasses}>
        <div className={`px-6 mb-10 flex items-center ${isCompact && !isMobile ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 text-xl">
              CE
            </div>
            {(!isCompact || isMobile) && (
              <div className="overflow-hidden">
                <h2 className="text-lg font-bold text-black leading-none truncate">Cultura</h2>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Admin</p>
              </div>
            )}
          </div>
          {isMobile && (
            <button onClick={() => setIsOpen(false)} className="text-slate-400">
              <X size={24} />
            </button>
          )}
        </div>
        
        <nav className="flex flex-col gap-3 px-4 flex-grow overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = item.path === "/admin" 
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.path);

            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-black hover:bg-slate-50 hover:text-blue-600'
                } ${isCompact && !isMobile ? 'justify-center px-0' : ''}`}
              >
                <item.icon size={26} className="shrink-0" />
                {(!isCompact || isMobile) && <span className="font-bold text-base whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
          
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link 
              to="/admin/configuracoes"
              className={`flex items-center gap-4 p-4 rounded-xl transition-all text-black hover:bg-slate-50 hover:text-blue-600 ${
                location.pathname === '/admin/configuracoes' ? 'bg-slate-100 text-blue-600' : ''
              } ${isCompact && !isMobile ? 'justify-center px-0' : ''}`}
            >
              <Settings size={26} className="shrink-0" />
              {(!isCompact || isMobile) && <span className="font-bold text-base whitespace-nowrap">Configurações</span>}
            </Link>
          </div>
        </nav>

        <div className="px-4 mt-auto pb-8">
          <button 
            onClick={() => {
              logoutFake();
              navigate('/login');
            }}
            className={`w-full flex items-center gap-4 p-4 rounded-xl text-black hover:text-red-500 hover:bg-red-50 transition-all group ${isCompact && !isMobile ? 'justify-center px-0' : ''}`}
          >
            <LogOut size={26} className="shrink-0 group-hover:translate-x-1 transition-transform" />
            {(!isCompact || isMobile) && <span className="font-bold text-base whitespace-nowrap">Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;