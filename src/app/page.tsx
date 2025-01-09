'use client' ;
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import React from "react";

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between pt-8">
        <div className="pt-4 lg:text-left lg:pl-6 font-serif">
          <h1 className="font-bold text-4xl md:text-6xl lg:text-6xl">
            Connecting Thoughts!
            <br /> Inspiring Words!
          </h1>
          <p className="text-lg md:text-2xl pt-3">
            Where Ideas Take Shape and Words Find Their Home.
          </p>
          <Link href='/main/read'>
          <button className="p-3 bg-amber-600 hover:bg-amber-400 rounded-xl ml-10 mt-3 text-xl">
            Start Reading
          </button></Link>
          
        </div>
        <div className="mt-8 lg:mt-0 hidden lg:block ">
          <Image
            src="/inklink-1.jpg"
            alt="Hero Image"
            width={600}
            height={400}
            className="w-full h-auto rounded-xl shadow-3xl"
          />
        </div>
      </main>
      <Footer />
      
    </div>
  );
}