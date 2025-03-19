"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socialLinks = [
  {
    id: 1,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ouma-ouma-a01716267/",
    icon: FaLinkedin,
    color: "hover:text-blue-500",
    element: "water"
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com/oumaoumag",
    icon: FaGithub,
    color: "hover:text-gray-300",
    element: "earth"
  },
  {
    id: 3,
    name: "Twitter",
    url: "https://x.com/ouma_godwin1",
    icon: FaTwitter,
    color: "hover:text-blue-400",
    element: "air"
  }
];

const SocialLinks = ({ className, iconSize = 6 }) => {
  // Element color styles based on theme
  const getElementColor = (element) => {
    switch(element) {
      case 'earth': return "hover:text-earth";
      case 'water': return "hover:text-water";
      case 'fire': return "hover:text-fire";
      case 'air': return "hover:text-air";
      default: return "hover:text-primary-500";
    }
  };
  
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((social) => (
        <motion.div
          key={social.id}
          whileHover={{ scale: 1.2, y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`text-gray-400 ${getElementColor(social.element)} transition-colors duration-300`}
          >
            <social.icon className={`w-${iconSize} h-${iconSize}`} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialLinks; 