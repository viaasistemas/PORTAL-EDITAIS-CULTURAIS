"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CategoryCard = ({ icon: Icon, title, description }: CategoryCardProps) => {
  return (
    <div className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500">
          <Icon className="text-slate-400 group-hover:text-white transition-colors" size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;