"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Settings, 
  LogOut,
  FileText,
  LayoutDashboard,
  Library,
} from 'lucide-react';
import { useSession } from './SessionContextProvider';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutFake } = useSession();
  
  // Estado para controlar se o sidebar está expandido ou recolhido
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => !prev);
    };
    window.addEventListener('toggle-admin-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleToggle);
  }, []);

  // Ao clicar em um link, o sidebar se recolhe automaticamente
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Painel", path: "/admin" },
    { icon: FileText, label: "Inscrições", path: "/admin/inscricoes" },
    { icon: Library, label: "Biblioteca", path: "/admin/biblioteca" },
  ];

  return (
    <aside 
      className={`sticky top-0 h-screen bg-white border-r border-slate-200 flex flex-col py-8 transition-all duration-300 ease-in-out z-30 ${
        isOpen ? 'w-72' : 'w-20'
      }`}
    >
      {/* Logo / Header do Sidebar */}
      <div className={`px-4 mb-10 flex items-center ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 text-xl shadow-lg shadow-blue-100">
          CE
        </div>
        {isOpen && (
          <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
            <h2 className="text-lg font-bold text-black leading-none truncate">Cultura</h2>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Admin</p>
          </div>
        )}
      </div>
      
      {/* Links de Navegação */}
      <nav className="flex flex-col gap-3 px-3 flex-grow overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = item.path === "/admin" 
            ? location.pathname === "/admin"
            : location.pathname.startsWith(item.path);

          return (
            <Link 
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              title={!isOpen ? item.label : ""}
              className={`flex items-center rounded-xl transition-all group h-14 ${
                isOpen ? 'px-4 gap-4' : 'justify-center'
              } ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              <item.icon size={24} className="shrink-0" />
              {isOpen && (
                <span className="font-bold text-base whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
        
        <div className={`mt-4 pt-4 border-t border-slate-100 ${!isOpen && 'flex justify-center'}`}>
          <Link 
            to="/admin/configuracoes"
            onClick={handleLinkClick}
            title={!isOpen ? "Configurações" : ""}
            className={`flex items-center rounded-xl transition-all h-14 ${
              isOpen ? 'px-4 gap-4' : 'justify-center'
            } ${
              location.pathname === '/admin/configuracoes' 
                ? 'bg-slate-100 text-blue-600' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
            }`}
          >
            <Settings size={24} className="shrink-0" />
            {isOpen && (
              <span className="font-bold text-base whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                Configurações
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Botão Sair */}
      <div className="px-3 mt-auto">
        <button 
          onClick={() => {
            logoutFake();
            navigate('/login');
          }}
          title={!isOpen ? "Sair" : ""}
          className={`w-full flex items-center rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all group h-14 ${
            isOpen ? 'px-4 gap-4' : 'justify-center'
          }`}
        >
          <LogOut size={24} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          {isOpen && (
            <span className="font-bold text-base whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
              Sair
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;