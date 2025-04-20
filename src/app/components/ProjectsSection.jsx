"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView, useAnimation } from "framer-motion";


const ProjectsSection = () => {
  // state for projects data
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableTags, setAvailableTags] = useState(["All"]);

  // State for selected tag
  const [tag, setTag] = useState("All");

  // Animation states
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Fetch projects from Github API
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching projects...'); // Debug

        // Use our API route by default, with fallback to direct GitHub API
        const useApiRoute = true; // Set to true to use our API route

        let data = [];

        try {
          // First try our API route
          if (useApiRoute) {
            console.log('Fetching from API route...');
            const response = await fetch("/api/github");

            if (!response.ok) {
              throw new Error(`API route failed: ${response.status}`);
            }

            data = await response.json();
            console.log('API Response:', data.length, 'projects'); // Debug
          }
        } catch (apiError) {
          console.error('API route error:', apiError);
          // If API route fails, fall back to direct GitHub API
          console.log('Falling back to direct GitHub API...');

          // Direct fetch to GitHub API as fallback
          const username = 'oumaoumag'; // Your GitHub username from env
          const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

          if (!response.ok) {
            throw new Error(`Failed to fetch directly from GitHub: ${response.status}`);
          }

          const repos = await response.json();
          console.log('Direct GitHub API Response:', repos.length, 'repositories'); // Debug

          // Process repositories similar to our API
          data = repos
            .filter(repo => !repo.fork && !repo.archived)
            .map(repo => ({
              id: repo.id,
              title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
              description: repo.description || 'No description provided',
              image: '/images/projects/default.png',
              tags: ['All', repo.language].filter(Boolean),
              tag: ['All', repo.language].filter(Boolean),
              gitUrl: repo.html_url,
              previewUrl: repo.homepage || repo.html_url,
              element: 'earth',
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language,
              updatedAt: repo.updated_at
            }));
        }

        console.log('Final data:', data.length, 'projects'); // Debug
        setProjects(data);
        setFilteredProjects(data);

        // Extract unique tags from all projects
        const uniqueTags = new Set(["All"]);
        // Extract tags from the data we just received

        data.forEach(project => {
          // Check if project has tags or tag property
          const projectTags = project.tags || project.tag || [];
          if (Array.isArray(projectTags)) {
            projectTags.forEach(t => {
              if (t) uniqueTags.add(t);
            });
          }
        });

        console.log('Available tags:', Array.from(uniqueTags)); // Debug
        setAvailableTags(Array.from(uniqueTags));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter's projects when tags changes
  useEffect(() => {
    console.log('Filtering projects. Tag:', tag, 'Projects:', projects.length); // Debug: Log filtering
    if (tag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => {
        // Check both tags and tag properties
        const projectTags = project.tags || project.tag || [];
        return Array.isArray(projectTags) && projectTags.includes(tag);
      }));
    }
    console.log('Filtered projects:', filteredProjects.length); // Debug: Log filtered results

  }, [tag, projects]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };


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

  // Assign colors to tags
  const getTagColor = (tagName) => {
    if (tagName === "All") return "primary";
    // Fixed inconsistent capitalization of "web3" vs "Web3"
    if (tagName === "Web3" || tagName === "Solidity") return "fire";
    if (tagName === "Systems" || tagName === "TypeScript" || tagName === "JavaScript") return "water";
    if (tagName === "Algorithms" || tagName === "ML" || tagName === "Interpreter") return "air";
    return "primary"; //Default color
  };

  // Debug: Log render state
  console.log('Render state:', { isLoading, error, projectsCount: filteredProjects.length });

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

      {/* LOading state */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-white">Loading projects...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">Error: {error}</p>
          <p className="text-white mt-2">Couldnt't load projects. Please try again later.</p>
        </div>
      )}

      {/* Content when loaded */}
      {!isLoading && !error && (
        <>
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white flex flex-wrap justify-center items-center gap-1.5 py-4">
            {availableTags.map((tagName) => (
              <ProjectTag
                key={tagName}
          onClick={handleTagChange}
                name={tagName}
                isSelected={tag === tagName}
                color={getTagColor(tagName)}
              />
            ))}
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
            key={project.id}
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
        </>
      )}
    </section>
  );
};

export default ProjectsSection;
