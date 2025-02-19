'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import searchIcon from './assets/searchicon.svg';

interface CardProps {
  children: React.ReactNode;
  header: string;
  search?: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

export default function Card({ 
  children, 
  header, 
  search, 
  searchTerm, 
  setSearchTerm 
}: CardProps) {

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  return (

    <article className='flex flex-col justify-center bg-white w-full h-full rounded-xl mb-6'>
      {header && <header className='flex font-extrabold text-2xl mt-0 p-6 items-center'>
        {header}
        {search && (
          <>
            <button className='ml-auto' onClick={() => setShowSearchBar(prev => !prev)}>
              <Image 
                src={searchIcon} 
                alt='search icon' 
                height={18}       
              />
            </button>

            {showSearchBar && (
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm?.(e.target.value)}
                className="flex ml-2 border h-[30px] w-[50%] px-[12px] text-sm border-gray-300 rounded-2xl"
                autoFocus
                onBlur={() => {
                  if (searchTerm === "") {
                      setShowSearchBar(false);
                  }
                }}
              />
            )}
          </>
        )}
      </header>
      }

      <section className='overflow-auto flex-1 '>
        {children}
      </section>

    </article>
  );
}