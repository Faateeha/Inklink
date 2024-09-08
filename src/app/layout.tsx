import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ColorModeToggle from '@/components/colormode'

import { ChakraProvider } from "@chakra-ui/react";

const poppins = Poppins({ weight:"400", subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "INKLINK",
  description: "Allows users read and write",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        
      <body className={poppins.className} >
      <ChakraProvider>
      
        <div className=" p-3 ">
        {children}
        
        </div>
        </ChakraProvider>
        </body>
       
        
    </html>
  );
}
