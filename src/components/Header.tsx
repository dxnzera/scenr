'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import ThemeToggle from '../components/ThemeToggle';
import User from '@/components/User';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[var(--color-background)] shadow-lg shadow-purple-500/10 backdrop-blur-md">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center relative">
        <Image
          src="/images/LogotipoLight.png"
          alt="Logo"
          width={120}
          height={40}
          className="pb-1 opacity-100 dark:opacity-0 transition-opacity"
        />
        <Image
          src="/images/Logotipo.png"
          alt="Logo"
          width={120}
          height={40}
          className="absolute pb-1 opacity-0 dark:opacity-100 transition-opacity"
        />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4">
        <Input
          placeholder="Pesquisar filmes e séries"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="card w-full"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <User />
      </div>
    </header>
  );
}
