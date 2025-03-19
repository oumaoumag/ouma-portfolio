"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  SiGo,
  SiJavascript,
  SiPython,
  SiMysql,
  SiRust,
  SiC,
  SiCss3,
  SiHtml5,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiFigma,
  SiDocker,
  SiTailwindcss,
  SiWebassembly,
  SiWeb3Dotjs,
  SiAlgolia,
  SiLeetcode,
  SiRedis,
} from "react-icons/si";
import { FaCode, FaNetworkWired, FaMicrochip, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

const getSkillIcon = (name) => {
  const iconProps = { className: "w-6 h-6" };
  const normalizedName = name?.toLowerCase(); // Safeguard for undefined `name`
  
  const icons = {
    go: SiGo,
    javascript: SiJavascript,
    python: SiPython,
    mysql: SiMysql,
    rust: SiRust,
    c: SiC,
    css: SiCss3,
    html: SiHtml5,
    "html/css": SiHtml5,
    react: SiReact,
    typescript: SiTypescript,
    "node.js": SiNodedotjs,
    "ui/ux": SiFigma,
    docker: SiDocker,
    tailwind: SiTailwindcss,
    webassembly: SiWebassembly,
    web3: SiWeb3Dotjs,
    algorithms: SiLeetcode,
    redis: SiRedis,
    interpreters: FaCode,
    compilers: FaCode,
    "system design": FaNetworkWired,
  };

  const IconComponent = icons[normalizedName] || FaBrain; // Default icon
  return <IconComponent {...iconProps} />;
};

const SkillBadge = ({ name, level }) => {
  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return {
          bg: "from-primary-500 to-primary-700",
          border: "border-primary-300",
          shadow: "shadow-primary-500/20"
        };
      case "Advanced":
        return {
          bg: "from-secondary-500 to-secondary-700",
          border: "border-secondary-300",
          shadow: "shadow-secondary-500/20"
        };
      case "Intermediate":
        return {
          bg: "from-water to-blue-700",
          border: "border-blue-300",
          shadow: "shadow-blue-500/20"
        };
      default:
        return {
          bg: "from-gray-500 to-gray-700",
          border: "border-gray-300",
          shadow: "shadow-gray-500/20"
        };
    }
  };

  const colorScheme = getLevelColor();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        px-4 py-3 rounded-lg
        bg-gradient-to-r ${colorScheme.bg}
        border border-opacity-20 ${colorScheme.border}
        shadow-lg ${colorScheme.shadow}
        cursor-default
        flex items-center gap-3
        text-white
      `}
    >
      <div className="flex-shrink-0 bg-dark-accent p-2 rounded-md">
        {getSkillIcon(name)}
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs opacity-75">{level}</div>
      </div>
    </motion.div>
  );
};

// Optional: Use dynamic import to improve performance
export default dynamic(() => Promise.resolve(SkillBadge), {
  ssr: false,
});