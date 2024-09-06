import React from 'react';
import Top from '@/components/top'
import Footer from '@/components/Footer'


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className="bg-black text-white ">
          <Top />
        {children}
        <Footer />
        </div>
    )
}