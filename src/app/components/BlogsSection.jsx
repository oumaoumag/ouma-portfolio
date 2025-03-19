"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

// Blog posts data from dev.to
const blogPosts = [
  {
    id: 1,
    title: "Building a Multi-Section Page for a Game Interface",
    description: "Learn how to create a captivating multi-section game interface using HTML and CSS, with a focus on layout organization and visual hierarchy.",
    tags: ["HTML", "CSS", "Game Dev", "Web Design"],
    date: "May 3, 2023",
    url: "https://dev.to/ouma_ouma/building-a-multi-section-page-for-a-game-interface-3l3k",
    readTime: "4 min read",
    element: "fire"
  },
  {
    id: 2,
    title: "Advanced HTML for Game Development: Crafting a Single-Page Game Interface Wireframe",
    description: "Explore advanced HTML techniques for building complex game interfaces, including structured layouts and semantic markup for game components.",
    tags: ["HTML", "Game Dev", "UI Design"],
    date: "Apr 27, 2023",
    url: "https://dev.to/ouma_ouma/advanced-html-for-game-development-crafting-a-single-page-game-interface-wireframe-3mfb",
    readTime: "5 min read",
    element: "earth"
  },
  {
    id: 3,
    title: "Introduction to Forms-Building Interactive Web Pages",
    description: "A comprehensive guide to creating interactive web forms, covering input types, validation techniques, and user experience best practices.",
    tags: ["HTML", "Forms", "Web Dev"],
    date: "Apr 13, 2023",
    url: "https://dev.to/ouma_ouma/introduction-to-forms-building-interactive-web-pages-34ke",
    readTime: "4 min read",
    element: "water"
  },
  {
    id: 4,
    title: "Embracing HTML Structure & Semantics",
    description: "Discover the importance of semantic HTML and proper document structure for building accessible, maintainable, and SEO-friendly websites.",
    tags: ["HTML", "Semantics", "Web Dev"],
    date: "Apr 6, 2023",
    url: "https://dev.to/ouma_ouma/embracing-html-structure-semantics-41kf",
    readTime: "3 min read",
    element: "air"
  },
  {
    id: 5,
    title: "HTML Basics: A Beginner's Guide",
    description: "An introductory guide to HTML fundamentals, covering essential tags, attributes, and concepts for newcomers to web development.",
    tags: ["HTML", "Beginners", "Web Dev"],
    date: "Mar 30, 2023",
    url: "https://dev.to/ouma_ouma/html-basics-a-beginners-guide-2fb6",
    readTime: "5 min read",
    element: "earth"
  },
  {
    id: 6,
    title: "Getting Started with Blockchain: A Guide for Beginners",
    description: "A comprehensive introduction to blockchain technology, covering core concepts, applications, and first steps for developers interested in Web3.",
    tags: ["Blockchain", "Web3", "Beginners"],
    date: "Mar 23, 2023",
    url: "https://dev.to/ouma_ouma/getting-started-with-blockchain-a-guide-for-beginners-18n4",
    readTime: "6 min read",
    element: "fire"
  }
];

// Blog card component
const BlogCard = ({ blog }) => {
  // Element color styles based on theme
  const getElementBorder = (element) => {
    switch(element) {
      case 'earth': return "border-earth";
      case 'water': return "border-water";
      case 'fire': return "border-fire";
      case 'air': return "border-air";
      default: return "border-primary-500";
    }
  };

  const getElementBg = (element) => {
    switch(element) {
      case 'earth': return "group-hover:bg-earth/10";
      case 'water': return "group-hover:bg-water/10";
      case 'fire': return "group-hover:bg-fire/10";
      case 'air': return "group-hover:bg-air/10";
      default: return "group-hover:bg-primary-500/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link 
        href={blog.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`block h-full p-4 rounded-lg border ${getElementBorder(blog.element)} bg-[rgba(15,23,42,0.6)] backdrop-blur-sm hover:bg-[rgba(28,35,58,0.6)] transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={`px-1.5 py-0.5 text-xs rounded ${getElementBg(blog.element)} text-gray-300 transition-colors duration-300`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-1 text-white group-hover:text-gray-200 line-clamp-1">{blog.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{blog.description}</p>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{blog.date}</span>
              <span>{blog.readTime}</span>
            </div>
            <div className="mt-2 flex items-center text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">
              <span className="mr-1">Read Article</span>
              <HiArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogsSection = () => {
  const [visiblePosts, setVisiblePosts] = useState(blogPosts.slice(0, 4));
  const [showMoreVisible, setShowMoreVisible] = useState(blogPosts.length > 4);

  const handleShowMore = () => {
    setVisiblePosts(blogPosts);
    setShowMoreVisible(false);
  };

  return (
    <section className="py-8" id="blogs">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">My Blog</h2>
            <p className="text-gray-300 text-sm max-w-2xl">
              I write about web development, blockchain technology, and software engineering best practices. 
              Check out my latest articles and thoughts.
            </p>
          </div>
          
          <Link
            href="https://dev.to/ouma_ouma"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 group flex items-center text-gray-400 hover:text-white transition-colors duration-300 text-sm"
          >
            <span className="mr-1">View all posts</span>
            <HiArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visiblePosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {showMoreVisible && (
          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShowMore}
              className="px-4 py-2 text-sm rounded-lg bg-[rgba(28,35,58,0.6)] text-white hover:bg-[rgba(35,45,70,0.6)] transition-colors duration-300"
            >
              Show More Articles
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection; 