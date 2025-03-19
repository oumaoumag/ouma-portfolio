import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

// Color mapping for theme consistency
const colorMap = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  earth: "bg-earth",
  water: "bg-water",
  fire: "bg-fire",
  air: "bg-air"
};

// Opacity variant of color mapping
const shadowColorMap = {
  primary: "bg-primary-500/5",
  secondary: "bg-secondary-500/5",
  earth: "bg-earth/5",
  water: "bg-water/5",
  fire: "bg-fire/5",
  air: "bg-air/5"
};

const TabButton = ({ active, selectTab, children, color = "primary" }) => {
  const buttonClasses = active ? "text-white" : "text-[#ADB7BE]";
  const underlineColor = colorMap[color] || colorMap.primary;
  const shadowColor = shadowColorMap[color] || shadowColorMap.primary;

  return (
    <button 
      onClick={selectTab} 
      className="relative py-2 px-1 transition-all duration-300"
    >
      <p className={`mr-3 font-semibold hover:text-white transition-colors duration-300 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className={`h-1 ${underlineColor} mt-2 mr-3 rounded-full`}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      ></motion.div>
      {active && (
        <motion.span
          layoutId="tabShadow"
          className={`absolute inset-0 rounded-lg -z-10 ${shadowColor}`}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
};

export default TabButton;
