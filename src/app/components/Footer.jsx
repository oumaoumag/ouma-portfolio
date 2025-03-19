import React from "react";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer border-t border-t-[#33353F] bg-dark text-white py-8">
      <div className="container mx-auto px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Ouma²
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Building systems with passion and precision
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <SocialLinks iconSize={5} className="mb-3" />
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ouma Godwin. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
          Built with Next.js, Tailwind CSS, and Framer Motion
        </div>
      </div>
    </footer>
  );
};

export default Footer;
