"use client";

import React from 'react';

interface CategoryCardProps {
  imageIcon?: string;
  title: string;
  description: string;
}

const CategoryCard = ({ imageIcon, title, description }: CategoryCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-left h-full group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors duration-300 p-3">
          {imageIcon && (
            <img src={imageIcon} alt={title} className="w-full h-full object-contain" />
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-[#2b59c3] leading-tight">{title}</h3>
          <div className="flex gap-1 mt-2">
            <div className="w-6 h-0.5 bg-blue-600 rounded-full" />
            <div className="w-6 h-0.5 bg-yellow-400 rounded-full" />
            <div className="w-6 h-0.5 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>
      <p className="text-slate-600 text-xs leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default CategoryCard;