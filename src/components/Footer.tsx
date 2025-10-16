'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import ThemeToggle from './ThemeToggle';
import User from '@/components/User';

export default function Footer() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[var(--color-background)] shadow-lg shadow-purple-500/10 backdrop-blur-md">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center relative">
        <Image
          src="/images/Logotipo Roxa.png"
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
    </header>
  );
}
