// src/app/api/github/route.js
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// Initialize GitHub client with authentication
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Simple in-memory cache
let cache = {
  data: null,
  timestamp: 0
};

// Cache expiration time (1 hour)
const CACHE_EXPIRATION = 60 * 60 * 1000;

/**
 * Maps GitHub repository data to project format
 * @param {Object} repo - GitHub repository data
 * @returns {Object} Formatted project data
 */
function mapRepoToProject(repo) {
  // Extract topics and add default "All" tag
  const tags = ["All"];
  
  // Add language as a tag if available
  if (repo.language) {
    tags.push(repo.language);
  }
  
  // Add repository topics as tags
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.map(topic => 
      // Capitalize first letter of each topic
      topic.charAt(0).toUpperCase() + topic.slice(1)
    ));
  }
  
  // Determine element type based on topics or language
  let element = "earth"; // Default element
  
  if (repo.topics.includes("web3") || repo.language === "Solidity") {
    element = "fire";
  } else if (repo.topics.includes("web") || repo.language === "JavaScript" || repo.language === "TypeScript") {
    element = "water";
  } else if (repo.topics.includes("ai") || repo.topics.includes("ml")) {
    element = "air";
  }
  
  // Map repository to project format
  return {
    id: repo.id,
    title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
    description: repo.description || "No description provided",
    image: `/images/projects/default.png`, // Default image
    tag: [...new Set(tags)], // Remove duplicates
    gitUrl: repo.html_url,
    previewUrl: repo.homepage || repo.html_url,
    element: element,
    // Additional GitHub-specific data
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    updatedAt: repo.updated_at
  };
}

/**
 * GET handler for GitHub repositories API
 */
export async function GET(req) {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const tagFilter = url.searchParams.get("tag");
    
    // Check if we have cached data that's still valid
    if (cache.data && (Date.now() - cache.timestamp) < CACHE_EXPIRATION) {
      // If tag filter is provided, filter the cached data
      if (tagFilter && tagFilter !== "All") {
        const filtered = cache.data.filter(project => 
          project.tag.includes(tagFilter)
        );
        return NextResponse.json(filtered);
      }
      // Otherwise return all cached data
      return NextResponse.json(cache.data);
    }

    // Fetch repositories from GitHub
    const username = process.env.GITHUB_USERNAME;
    const { data: repos } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
      type: "owner" // Only include repos owned by the user
    });

    // Process repositories
    const projects = repos
      .filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
      .map(mapRepoToProject);

    // Update cache
    cache = {
      data: projects,
      timestamp: Date.now()
    };

    // Apply tag filtering if provided
    if (tagFilter && tagFilter !== "All") {
      const filtered = projects.filter(project => 
        project.tag.includes(tagFilter)
      );
      return NextResponse.json(filtered);
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories" },
      { status: 500 }
    );
  }
}
