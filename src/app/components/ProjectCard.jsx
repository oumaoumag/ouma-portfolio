import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, element = "primary" }) => {
  // Get element color scheme
  const getElementStyles = () => {
    switch(element) {
      case 'earth': 
        return {
          border: "border-earth",
          gradientFrom: "from-earth/40",
          gradientTo: "to-earth/5",
          shadow: "shadow-earth/30",
          buttonBorder: "hover:border-earth",
          buttonText: "group-hover/link:text-earth"
        };
      case 'water': 
        return {
          border: "border-water",
          gradientFrom: "from-water/40",
          gradientTo: "to-water/5",
          shadow: "shadow-water/30",
          buttonBorder: "hover:border-water",
          buttonText: "group-hover/link:text-water"
        };
      case 'fire': 
        return {
          border: "border-fire",
          gradientFrom: "from-fire/40",
          gradientTo: "to-fire/5",
          shadow: "shadow-fire/30",
          buttonBorder: "hover:border-fire",
          buttonText: "group-hover/link:text-fire"
        };
      case 'air': 
        return {
          border: "border-air",
          gradientFrom: "from-air/40",
          gradientTo: "to-air/5",
          shadow: "shadow-air/30",
          buttonBorder: "hover:border-air",
          buttonText: "group-hover/link:text-air"
        };
      default: 
        return {
          border: "border-primary-500",
          gradientFrom: "from-primary-500/40",
          gradientTo: "to-primary-500/5",
          shadow: "shadow-primary-500/30",
          buttonBorder: "hover:border-primary-500",
          buttonText: "group-hover/link:text-primary-500"
        };
    }
  };
  
  const styles = getElementStyles();
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`rounded-xl overflow-hidden border border-opacity-20 ${styles.border} shadow-lg ${styles.shadow} bg-[rgba(15,23,42,0.6)] backdrop-blur-sm`}
    >
      <div
        className="h-32 md:h-44 relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className={`overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-gradient-to-b ${styles.gradientFrom} ${styles.gradientTo} opacity-0 hidden group-hover:flex group-hover:opacity-95 transition-all duration-500`}>
          <Link
            href={gitUrl}
            className={`h-10 w-10 mr-2 border-2 relative rounded-full border-[#ADB7BE] ${styles.buttonBorder} group/link`}
          >
            <CodeBracketIcon className={`h-6 w-6 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${styles.buttonText}`} />
          </Link>
          <Link
            href={previewUrl}
            className={`h-10 w-10 border-2 relative rounded-full border-[#ADB7BE] ${styles.buttonBorder} group/link`}
          >
            <EyeIcon className={`h-6 w-6 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${styles.buttonText}`} />
          </Link>
        </div>
      </div>
      <div className="text-white mt-2 py-3 px-4">
        <h5 className="text-base font-semibold mb-1">{title}</h5>
        <p className="text-gray-300 text-xs line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
