"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

const HeroSection = () => {
  // Simplified animated elements for background
  const Elements = () => {
    // Fixed positions and sizes to prevent hydration mismatch
    const elementStyles = [
      { width: "100px", height: "94px", top: "70%", left: "24%" },
      { width: "130px", height: "182px", top: "66%", left: "80%" },
      { width: "70px", height: "155px", top: "14%", left: "98%" },
      { width: "87px", height: "61px", top: "99%", left: "85%" }
    ];

    // Fixed animation values
    const animationValues = [
      { x: [0, 5], y: [0, 8], duration: 15 },
      { x: [0, -7], y: [0, 5], duration: 18 },
      { x: [0, 10], y: [0, -6], duration: 12 },
      { x: [0, -5], y: [0, -8], duration: 20 }
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'bg-primary-500/10' :
                i % 4 === 1 ? 'bg-secondary-500/10' :
                  i % 4 === 2 ? 'bg-water/10' :
              'bg-fire/10'
            }`}
            style={{
              width: elementStyles[i].width,
              height: elementStyles[i].height,
              top: elementStyles[i].top,
              left: elementStyles[i].left,
              zIndex: -1
            }}
            animate={{
              x: animationValues[i].x,
              y: animationValues[i].y,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: animationValues[i].duration,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative flex flex-col justify-center min-h-screen">
      <Elements />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left side - Text content */}
        <div className="col-span-1 lg:col-span-7 text-center lg:text-left">
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-6xl lg:leading-tight font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Hello, I&apos;m{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Ouma Godwin",
                1000,
                "Systems Engineer",
                1000,
                "Go Developer",
                1000,
                "Web Developer",
                1000,
                "Smart Contract Integrator",
                1000,
                "Logical Thinker",
                1000,
                "Language Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500"
            />
          </h1>

          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl max-w-xl mx-auto lg:mx-0">
            Building elegant systems and interpreters with Go and Rust. Crafting efficient algorithms and exploring Web3 technologies with a focus on logical architecture and optimal performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/#contact"
              className="px-6 py-3 inline-block w-full sm:w-fit rounded-full mr-3 bg-gradient-to-br from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-base shadow-md shadow-primary-500/20 transition-all duration-300"
            >
              Hire Me
            </Link>
            <Link
              href="/#projects"
              className="px-6 py-3 inline-block w-full sm:w-fit rounded-full bg-transparent hover:bg-dark-accent text-white text-base border border-primary-500 hover:border-primary-400 transition-all duration-300"
            >
              View Projects
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <SocialLinks iconSize={5} className="justify-center lg:justify-start" />
          </div>

          {/* Element themed dots */}
          <div className="hidden lg:flex mt-6 space-x-3">
            <div className="w-3 h-3 rounded-full bg-earth"></div>
            <div className="w-3 h-3 rounded-full bg-water"></div>
            <div className="w-3 h-3 rounded-full bg-fire"></div>
            <div className="w-3 h-3 rounded-full bg-air"></div>
          </div>
        </div>

        {/* Right side - Image - KEEPING OVERALL APPEARANCE BUT SLIGHTLY REDUCED SIZE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-2 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px]">
            <div className="absolute inset-2 rounded-full bg-dark-accent flex items-center justify-center overflow-hidden">
              <Image
                src="/images/godwin.jpeg"
                alt="Ouma Godwin"
                width={400}
                height={400}
                className="w-full h-full object-cover object-center"
                priority
              />

              {/* Decorative rings */}
              <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full"></div>
              <div className="absolute inset-[15px] border-2 border-secondary-500/20 rounded-full"></div>
            </div>

            {/* Animated circle pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-500/40"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.5, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
