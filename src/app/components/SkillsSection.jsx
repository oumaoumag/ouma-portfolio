"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  FaCode, FaReact, FaServer, FaDatabase, FaTools, FaCloud, 
  FaAws, FaDocker, FaGitAlt, FaGithub, FaHtml5, FaCss3, 
  FaJs, FaNodeJs, FaTerminal, FaFont,
  FaShip, FaNetworkWired, FaDesktop, FaPython
} from "react-icons/fa";
import { DiMongodb, DiPostgresql, DiRust, DiCodeBadge, DiDjango } from "react-icons/di";
import { GoVerified } from "react-icons/go";
import { SiSolidity } from "react-icons/si";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

// Helper function to get color based on skill category
const getSkillBarColor = (category) => {
  const categoryColors = {
    "Languages": "from-primary-500 to-primary-400",
    "Frontend": "from-water to-blue-400",
    "Backend": "from-earth to-green-400",
    "Databases": "from-fire to-orange-400",
    "DevOps & Tools": "from-secondary-500 to-purple-400",
    "Web3 & Blockchain": "from-secondary-500 to-purple-400",
  };

  return categoryColors[category] || "from-primary-500 to-blue-400";
};

const SkillItem = ({ skill, idx }) => (
  <div key={idx} className="skill-item">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <span className="text-primary-400">{skill.icon}</span>
        <span className="text-white font-medium">{skill.name}</span>
      </div>
      <span className="text-primary-400 text-sm font-semibold">{skill.level}%</span>
    </div>
    <div className="h-2 bg-[rgba(30,40,60,0.8)] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: 0.3 * idx, ease: "easeOut" }}
        className={`h-full rounded-full bg-gradient-to-r ${getSkillBarColor(skill.category)}`}
      ></motion.div>
    </div>
  </div>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: <FaCode className="text-primary-500 w-6 h-6" />,
      skills: [
        { name: "Go", icon: <FaTerminal className="w-4 h-4" />, level: 90 },
        { name: "Rust", icon: <DiRust className="w-4 h-4" />, level: 75 },
        { name: "Python", icon: <FaPython className="w-4 h-4" />, level: 82 },
        { name: "JavaScript", icon: <FaJs className="w-4 h-4" />, level: 85 },
        { name: "TypeScript", icon: <DiCodeBadge className="w-4 h-4" />, level: 80 },
        { name: "Solidity", icon: <SiSolidity className="w-4 h-4" />, level: 78 },
        { name: "HTML/CSS", icon: <FaHtml5 className="w-4 h-4" />, level: 95 },
      ]
    },
    {
      title: "Frontend",
      icon: <FaReact className="text-water w-6 h-6" />,
      skills: [
        { name: "React", icon: <FaReact className="w-4 h-4" />, level: 85 },
        { name: "Next.js", icon: <FaDesktop className="w-4 h-4" />, level: 80 },
        { name: "TailwindCSS", icon: <FaFont className="w-4 h-4" />, level: 90 },
        { name: "UI/UX", icon: <FaCss3 className="w-4 h-4" />, level: 85 },
      ]
    },
    {
      title: "Backend",
      icon: <FaServer className="text-earth w-6 h-6" />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="w-4 h-4" />, level: 85 },
        { name: "Django", icon: <DiDjango className="w-4 h-4" />, level: 80 },
        { name: "Express", icon: <FaServer className="w-4 h-4" />, level: 80 },
        { name: "APIs", icon: <FaNetworkWired className="w-4 h-4" />, level: 85 },
        { name: "System Design", icon: <FaTools className="w-4 h-4" />, level: 90 },
      ]
    },
    {
      title: "Databases",
      icon: <FaDatabase className="text-fire w-6 h-6" />,
      skills: [
        { name: "MongoDB", icon: <DiMongodb className="w-4 h-4" />, level: 80 },
        { name: "PostgreSQL", icon: <DiPostgresql className="w-4 h-4" />, level: 85 },
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <FaTools className="text-secondary-500 w-6 h-6" />,
      skills: [
        { name: "Docker", icon: <FaDocker className="w-4 h-4" />, level: 85 },
        { name: "Kubernetes", icon: <FaShip className="w-4 h-4" />, level: 75 },
        { name: "Git", icon: <FaGitAlt className="w-4 h-4" />, level: 90 },
        { name: "GitHub", icon: <FaGithub className="w-4 h-4" />, level: 90 },
      ]
    },
    {
      title: "Web3 & Blockchain",
      icon: <FaCloud className="text-air w-6 h-6" />,
      skills: [
        { name: "Solidity Dev", icon: <SiSolidity className="w-4 h-4" />, level: 78 },
        { name: "Smart Contracts", icon: <FaTerminal className="w-4 h-4" />, level: 75 },
        { name: "AWS", icon: <FaAws className="w-4 h-4" />, level: 75 },
        { name: "Vercel", icon: <GoVerified className="w-4 h-4" />, level: 85 },
      ]
    },
  ];

  // Add category to each skill for color mapping
  const processedCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.map(skill => ({
      ...skill,
      category: category.title
    }))
  }));

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-transparent to-[rgba(15,23,42,0.3)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-3 relative inline-block"
          >
            Technical Skills
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary-500 rounded-full"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto mt-6"
          >
            My technical toolkit and expertise across various technologies
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {processedCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[rgba(15,23,42,0.6)] backdrop-blur-sm p-6 rounded-xl border border-[rgba(120,120,180,0.2)]
                shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-5">
                {category.skills.map((skill, idx) => (
                  <SkillItem key={idx} skill={skill} idx={idx} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection; 