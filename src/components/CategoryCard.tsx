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
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center">
      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
        <Icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={28} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed font-medium">{description}</p>
    </div>
  );
};

export default CategoryCard;