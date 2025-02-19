import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import '../styles/globals.css'
import Navigation from "./components/navigation/navigation";


const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'], 
  display: 'swap', 
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',  
  themeColor: '#f6f7f8'
}


export const metadata: Metadata = {
  title: "TechCare - Healthcare Dashboard Demo",
  metadataBase: new URL('https://meddash.vercel.app/'),
  description: "A modern, interactive healthcare dashboard for medical professionals to monitor patient vitals, track diagnosis history, and manage patient records efficiently",
  authors: [
    { name: 'Ilya Rozhkov', url: 'https://www.byilya.com' }
  ],
  creator: 'Ilya Rozhkov',
  openGraph: {
    type: 'website',
    title: 'TechCare - Modern Healthcare Dashboard',
    siteName: 'TechCare Dashboard',
    description: 'A healthcare dashboard demo featuring real-time patient monitoring, vital signs tracking, and comprehensive medical records management. Built with modern web technologies for optimal performance and user experience.',
    images: [{
      url: '/og.jpg',
      width: 1200,
      height: 630,
      alt: 'TechCare Dashboard Interface showing patient monitoring and health analytics'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechCare - Healthcare Professional Dashboard',
    description: 'Modern healthcare dashboard for efficient patient monitoring and medical records management',
    images: ['/og.jpg'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased bg-background font-manrope` }
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
