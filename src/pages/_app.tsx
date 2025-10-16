import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'
import '@/styles/fonts.css';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
