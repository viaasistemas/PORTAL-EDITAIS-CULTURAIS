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
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col text-left">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors duration-300">
          <Icon className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300" size={32} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
          <div className="w-8 h-1 bg-yellow-400 mt-3 rounded-full" />
        </div>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default CategoryCard;