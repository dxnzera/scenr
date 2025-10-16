'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageProps {
  children: ReactNode
}

export function Page({ children }: PageProps) {
  return (
    <main
      className={cn(
        'flex flex-col items-center justify-start min-h-screen w-full transition-colors duration-500',
        'bg-[var(--color-background)] text-[var(--color-text)]'
      )}
    >
      <div className="w-full max-w-5xl">{children}</div>
    </main>
  )
}
