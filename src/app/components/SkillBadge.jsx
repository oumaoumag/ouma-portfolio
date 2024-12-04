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
} from "react-icons/si";

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
    html5: SiHtml5,
    react: SiReact,
    typescript: SiTypescript,
    "node.js": SiNodedotjs,
    "ui/ux": SiFigma,
    docker: SiDocker,
  };

  const IconComponent = icons[normalizedName];
  return IconComponent ? <IconComponent {...iconProps} /> : null;
};

const SkillBadge = ({ name, level }) => {
  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return "from-emerald-500 to-emerald-700";
      case "Advanced":
        return "from-blue-500 to-blue-700";
      case "Intermediate":
        return "from-purple-500 to-purple-700";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  return (
    <div
      className={`
        px-4 py-2 rounded-lg
        bg-gradient-to-r ${getLevelColor()}
        transform hover:scale-105 transition-all duration-300
        cursor-default
        flex items-center gap-3
        text-white
      `}
    >
      <div className="flex-shrink-0">{getSkillIcon(name)}</div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs opacity-75">{level}</div>
      </div>
    </div>
  );
};

// Optional: Use dynamic import to improve performance
export default dynamic(() => Promise.resolve(SkillBadge), {
  ssr: false,
});