"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView, useAnimation } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "MilkNet dApp",
    description: "A blockchain-powered dairy supply chain platform enhancing transparency, eliminating intermediaries, and automating order management in the dairy industry using Web3 technologies.",
    image: "/images/projects/milknet.png",
    tag: ["All", "Web3", "React"],
    gitUrl: "https://github.com/oumaoumag/milknet-dapp.git",
    previewUrl: "https://milknet-dapp.vercel.app",
    element: "water",
  },
  {
    id: 2,
    title: "SuccorTrail",
    description: "A blockchain-based solution transforming food aid distribution with enhanced transparency, efficiency, and accountability to combat corruption and waste in humanitarian efforts.",
    image: "/images/projects/succortrail.svg",
    tag: ["All", "Web3", "Go"],
    gitUrl: "https://github.com/SuccorTrail/SuccorTrail",
    previewUrl: "/",
    element: "fire",
  },
  {
    id: 3,
    title: "Jam-Text",
    description: "An advanced text analysis algorithm project focusing on efficient text processing, pattern recognition, and optimization techniques for improved computational text handling.",
    image: "/images/projects/jamtext.svg",
    tag: ["All", "Algorithms", "Go", "Data"],
    gitUrl: "https://github.com/oumaoumag/Jam-Text",
    previewUrl: "/",
    element: "earth",
  },
  {
    id: 4,
    title: "Kisumu Language Interpreter",
    description: "A toy interpreted programming language built in Go featuring tokenization, abstract syntax trees, and parsing. Implements REPL, support for variables, functions, and basic data structures.",
    image: "/images/projects/kisumu.svg",
    tag: ["All", "Systems", "Go", "Interpreter"],
    gitUrl: "https://github.com/yourusername/kisumu",
    previewUrl: "/",
    element: "earth",
  },
  {
    id: 5,
    title: "Linear Stats Modeling Tool",
    description: "Statistical modeling and linear regression tool for data prediction and probability ranges, built with Go. Implements advanced algorithms for data analysis and forecasting.",
    image: "/images/projects/linear-stats.png",
    tag: ["All", "Algorithms", "Go", "Data"],
    gitUrl: "https://github.com/yourusername/linear-stats",
    previewUrl: "/",
    element: "water",
  },
  {
    id: 6,
    title: "Groupie Trackers",
    description: "A Go-based web application that displays artist data in a grid layout with interactive elements. Features efficient data structures and optimized API integrations.",
    image: "/images/projects/groupie.png",
    tag: ["All", "Web", "Go", "API"],
    gitUrl: "https://github.com/yourusername/groupie-trackers",
    previewUrl: "/",
    element: "fire",
  },
  {
    id: 7,
    title: "Code Ujuzi Learning Platform",
    description: "AI-powered coding app that accelerates learning by providing real-time translations into African languages, utilizing Llama models to enhance understanding in software development.",
    image: "/images/projects/small_logo.png",
    tag: ["All", "Web", "AI", "Go"],
    gitUrl: "/",
    previewUrl: "https://codeujuzi-github-io.onrender.com/",
    element: "air",
  },
  {
    id: 8,
    title: "Portfolio Website",
    description: "This portfolio website built with Next.js and React, showcasing my projects and professional journey with modern design principles.",
    image: "/images/projects/1.png",
    tag: ["All", "Web", "React"],
    gitUrl: "https://github.com/yourusername/ouma-portfolio",
    previewUrl: "/",
    element: "water",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) => {
    // Special handling for Web3/Blockchain tag
    if (tag === "Web3") {
      return project.tag.includes("Web3") || project.tag.includes("Blockchain");
    }
    return project.tag.includes(tag);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12
      } 
    },
  };

  // Get color based on element theme
  const getElementColor = (element) => {
    switch(element) {
      case 'earth': return 'bg-earth';
      case 'water': return 'bg-water';
      case 'fire': return 'bg-fire';
      case 'air': return 'bg-air';
      default: return 'bg-primary-500';
    }
  };

  return (
    <section id="projects">
      <div className="relative">
        {/* Decorative Element */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-20 bg-gradient-to-b from-primary-500 to-transparent"></div>
        </div>
      </div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-3xl font-bold text-white mt-4 mb-6"
      >
        My Projects
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-white flex flex-wrap justify-center items-center gap-1.5 py-4"
      >
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
          color="primary"
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
          color="secondary"
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web3"
          isSelected={tag === "Web3"}
          color="fire"
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Systems"
          isSelected={tag === "Systems"}
          color="earth"
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Algorithms"
          isSelected={tag === "Algorithms"}
          color="water"
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Go"
          isSelected={tag === "Go"}
          color="primary"
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Interpreter"
          isSelected={tag === "Interpreter"}
          color="air"
        />
      </motion.div>
      
      <motion.ul 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative"
          >
            {/* Element indicator dot */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full z-10 ${getElementColor(project.element)}`}></div>
            
            {/* Glow effect on hover */}
            {hoveredIndex === index && (
              <motion.div
                layoutId="projectHoverEffect"
                className={`absolute inset-0 -m-0.5 rounded-xl opacity-20 z-0 ${getElementColor(project.element)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              element={project.element}
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default ProjectsSection;
