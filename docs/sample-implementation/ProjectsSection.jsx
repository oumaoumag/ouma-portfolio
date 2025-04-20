"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const ProjectsSection = () => {
  // State for projects data
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for tag filtering
  const [tag, setTag] = useState("All");
  
  // Available tags extracted from projects
  const [availableTags, setAvailableTags] = useState(["All"]);
  
  // Animation ref
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/github");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
        
        // Extract unique tags from all projects
        const tags = ["All"];
        data.forEach(project => {
          project.tag.forEach(t => {
            if (!tags.includes(t)) {
              tags.push(t);
            }
          });
        });
        
        setAvailableTags(tags);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects when tag changes
  useEffect(() => {
    if (tag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => 
        project.tag.includes(tag)
      ));
    }
  }, [tag, projects]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      
      <div className="flex flex-row justify-center items-center gap-2 py-6">
        {availableTags.map((tagName) => (
          <ProjectTag
            key={tagName}
            name={tagName}
            onClick={handleTagChange}
            isSelected={tag === tagName}
          />
        ))}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          <p>Error loading projects: {error}</p>
          <p className="mt-4">Showing fallback project data instead.</p>
        </div>
      ) : (
        <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
                element={project.element}
                // Optional GitHub-specific props
                stars={project.stars}
                forks={project.forks}
                language={project.language}
              />
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsSection;
