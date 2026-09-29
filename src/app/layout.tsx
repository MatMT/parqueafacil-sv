import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ParqueaFácilSV | Alquiler de Cocheras y Estacionamiento Seguro',
  description:
    'Prototipo de pitch de marketing de la startup colaborativa salvadoreña ParqueaFácilSV. Encuentra y reserva parqueos seguros en Santa Tecla, Colonia Escalón, Zona Rosa y más.',
  keywords: [
    'parqueo el salvador',
    'estacionamiento santa tecla',
    'cocheras privadas',
    'parqueafacil',
    'chivo wallet bitcoin',
  ],
  authors: [{ name: 'Equipo ParqueaFácilSV' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#001F5D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased selection:bg-accent selection:text-primary">
        {children}
      </body>
    </html>
  );
}
