"use client";
import React from "react";
import Image from "next/image";
// import { Download } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="text-white" id="about">
      <div className="max-w-4xl mx-auto">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16">
          <Image 
            src="/images/about-image.png" 
            width={500} 
            height={500} 
            alt="About Ouma Godwin" 
            className="rounded-lg"
          />
          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="space-y-4">
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                I am a passionate developer with a knack for crafting robust solutions and engaging user experiences. I specialize in Go (Golang), building efficient backend systems, and enhancing the frontend with UI/UX design principles.
              </p>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                From tackling programming challenges to leading community-driven projects like BiasharaID, I thrive on solving complex problems and creating tools that empower others. My journey spans developing web applications, designing intuitive user interfaces, and diving into programming languages like Rust and JavaScript to expand my expertise.
              </p>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                Whether it&apos;s architecting APIs, creating interactive platforms, or mentoring others in coding fundamentals, I am driven by innovation and continuous learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;