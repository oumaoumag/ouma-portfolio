"use client";
import React, { useState } from "react";
import TabButton from "./TabButton";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutContent = {
  about: (
    <div className="text-gray-300">
      <p className="mb-3">
        I'm a passionate software engineer with expertise in building robust and efficient systems. My journey has taken me from developing traditional web applications to exploring the cutting-edge world of Web3 and blockchain technologies.
      </p>
      <p>
        I've created sophisticated applications like MilkNet dApp for dairy supply chain management and SuccorTrail for food aid distribution. I also enjoy building language interpreters like the Kisumu Language and working with text analysis algorithms in my Jam-Text project.
      </p>
    </div>
  ),
  expertise: (
    <div className="text-gray-300">
      <ul className="list-none space-y-3">
        {[
          { title: "Web Technologies", desc: "Expertise in creating responsive web applications using React, Next.js, and various front-end frameworks. Experience building DApps and integrating Web3 technologies." },
          { title: "Systems Programming", desc: "Proficient in Go and Rust for building efficient and concurrent systems, with a focus on performance optimization and memory safety." },
          { title: "Algorithms & Data", desc: "Strong foundation in algorithm design, data structures, text analysis, and pattern recognition for solving complex computational problems." },
          { title: "Language Design", desc: "Experience in building interpreters and compilers, with deep understanding of lexical analysis, parsing, and abstract syntax trees." }
        ].map((item, idx) => (
          <li key={idx} className="pl-0 flex flex-col">
            <span className="text-primary-400 font-semibold text-sm mb-1">{item.title}</span>
            <span className="text-gray-300 text-sm">{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
  projects: (
    <div className="text-gray-300">
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: "MilkNet dApp", desc: "Blockchain-powered dairy supply chain platform" },
          { title: "SuccorTrail", desc: "Blockchain solution for food aid distribution" },
          { title: "Jam-Text", desc: "Advanced text analysis algorithm project" },
          { title: "Kisumu Language", desc: "Toy interpreted programming language with REPL" }
        ].map((project, idx) => (
          <li key={idx} className="bg-[rgba(15,23,42,0.8)] p-3 rounded-lg border border-[rgba(120,120,180,0.1)]">
            <h4 className="text-primary-400 font-medium text-sm">{project.title}</h4>
            <p className="text-xs text-gray-400">{project.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
};

const AboutSection = () => {
  const [tab, setTab] = useState("about");

  // Stats/metrics for the About section
  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "20+", label: "Projects" },
    { value: "3", label: "Web3 Apps" },
    { value: "5+", label: "Languages" }
  ];

  return (
    <section className="py-12 relative" id="about">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left column with stats */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
              
              {/* Stats integrated in the left column */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-[rgba(15,23,42,0.6)] backdrop-blur-sm p-2 rounded-lg border border-[rgba(120,120,180,0.2)] text-center"
                  >
                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                      {stat.value}
                    </h3>
                    <p className="text-gray-300 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/Ouma_Godwin_Resume.pdf"
                  target="_blank"
                  className="w-full block text-center px-5 py-2 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium transition-all duration-300 text-sm"
                >
                  Download CV
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right column with tab content */}
          <div className="md:col-span-2">
            <div className="flex flex-row mb-6 border-b border-[rgba(120,120,180,0.2)]">
              {Object.keys(AboutContent).map((tabName) => (
                <TabButton 
                  key={tabName}
                  selectTab={() => setTab(tabName)}
                  active={tab === tabName}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </TabButton>
              ))}
            </div>

            <motion.div 
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {AboutContent[tab]}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;