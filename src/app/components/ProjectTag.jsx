import React from "react";
import { motion } from "framer-motion";

const ProjectTag = ({ name, onClick, isSelected, color = "primary" }) => {
  const getColorScheme = () => {
    // Base styles for all tags
    let base = "border transition-all duration-300";
    
    // Different color schemes based on the color prop
    const colorSchemes = {
      primary: {
        selected: "text-white border-primary-500 bg-primary-500/10",
        unselected: "text-[#ADB7BE] border-slate-600 hover:border-primary-400 hover:text-primary-400"
      },
      secondary: {
        selected: "text-white border-secondary-500 bg-secondary-500/10",
        unselected: "text-[#ADB7BE] border-slate-600 hover:border-secondary-400 hover:text-secondary-400"
      },
      earth: {
        selected: "text-white border-earth bg-earth/10",
        unselected: "text-[#ADB7BE] border-slate-600 hover:border-earth hover:text-earth"
      },
      water: {
        selected: "text-white border-water bg-water/10",
        unselected: "text-[#ADB7BE] border-slate-600 hover:border-water hover:text-water"
      },
      fire: {
        selected: "text-white border-fire bg-fire/10",
        unselected: "text-[#ADB7BE] border-slate-600 hover:border-fire hover:text-fire"
      },
      air: {
        selected: "text-white border-air bg-air/10",
        unselected: "text-[#ADB7BE] border-slate-600 hover:border-air hover:text-air"
      }
    };
    
    // Get correct color scheme or fallback to primary
    const scheme = colorSchemes[color] || colorSchemes.primary;
    
    // Return selected or unselected styles
    return `${base} ${isSelected ? scheme.selected : scheme.unselected}`;
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${getColorScheme()} rounded-full px-3 py-1.5 text-sm cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </motion.button>
  );
};

export default ProjectTag;
