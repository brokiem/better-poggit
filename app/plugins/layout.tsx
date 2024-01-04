/* eslint-disable @next/next/no-head-element */
import '@/styles/globals.css';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plugins - BetterPoggit',
  description: 'We have a wide variety of plugins for PocketMine-MP, including Economy, PvP, and more!',
  openGraph: {
    type: 'website',
    url: 'https://better-poggit.vercel.app/',
    title: 'BetterPoggit - High Quality PocketMine Plugins',
    description: 'We have a wide variety of plugins for PocketMine-MP, including Economy, PvP, and more!'
  }
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html>
    <body>{children}</body>
    </html>
  );
}
