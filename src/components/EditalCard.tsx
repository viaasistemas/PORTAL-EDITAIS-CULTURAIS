"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface EditalCardProps {
  title: string;
  description: string;
  image: string;
}

const EditalCard = ({ title, description, image }: EditalCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image/Carousel Area */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest">
            ACESSE:
          </span>
        </div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm font-medium mb-8">{description}</p>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all mt-auto">
          Ver Editais
        </Button>
      </div>
    </div>
  );
};

export default EditalCard;