import React from 'react';
import Top from '@/components/top'
import Footer from '@/components/Footer'
import ColorModeToggle from '@/components/colormode'


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className=" ">
          
          <Top />
        {children}
        <Footer />
        </div>
    )
}