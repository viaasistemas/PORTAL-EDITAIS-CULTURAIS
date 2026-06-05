"use client";

import React from 'react';

interface CategoryCardProps {
  imageIcon?: string;
  title: string;
  description: string;
  center?: boolean;
}

const CategoryCard = ({ imageIcon, title, description, center = false }: CategoryCardProps) => {
  return (
    <div className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group ${center ? 'items-center text-center' : 'text-left'}`}>
      <div className={`flex items-center gap-4 mb-6 ${center ? 'flex-col' : ''}`}>
        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors duration-300 p-3">
          {imageIcon && (
            <img src={imageIcon} alt={title} className="w-full h-full object-contain" />
          )}
        </div>
        <div className={`flex flex-col ${center ? 'items-center' : ''}`}>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
          <div className="flex gap-1 mt-2">
            <div className="w-6 h-0.5 bg-blue-600 rounded-full" />
            <div className="w-6 h-0.5 bg-yellow-400 rounded-full" />
            <div className="w-6 h-0.5 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default CategoryCard;