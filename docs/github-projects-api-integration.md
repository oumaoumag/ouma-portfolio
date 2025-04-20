# GitHub Projects API Integration

This document outlines the process of creating an API in the portfolio project that fetches GitHub projects and displays them sorted by tags.

## Overview

The goal is to replace the hardcoded projects in the portfolio with dynamically fetched data from GitHub repositories. This will allow for:

1. Automatic updates when new projects are created
2. Consistent tagging between GitHub and the portfolio
3. Dynamic filtering based on repository topics
4. Reduced maintenance overhead

## Implementation Checklist

### 1. Setup and Prerequisites

- [ ] Create GitHub Personal Access Token (PAT)
  - [ ] Go to GitHub Settings > Developer Settings > Personal Access Tokens
  - [ ] Generate a new token with `repo:read` permissions
  - [ ] Copy and save the token securely

- [ ] Add environment variables
  - [ ] Add `GITHUB_TOKEN` to `.env.local` file
  - [ ] Add `GITHUB_USERNAME` to `.env.local` file

- [ ] Install required dependencies
  - [ ] Install Octokit package: `npm install @octokit/rest`

### 2. Create GitHub API Route

- [ ] Create API route file
  - [ ] Create `src/app/api/github/route.js`
  - [ ] Implement GitHub API client using Octokit
  - [ ] Add error handling and response formatting

- [ ] Implement repository fetching
  - [ ] Fetch repositories for the configured GitHub username
  - [ ] Filter out forked repositories (optional)
  - [ ] Extract relevant data (name, description, topics, URL, etc.)

- [ ] Add caching mechanism
  - [ ] Implement in-memory or Redis caching to avoid rate limits
  - [ ] Set appropriate cache expiration (e.g., 1 hour)

### 3. Implement Tag-Based Sorting and Filtering

- [ ] Create tag mapping system
  - [ ] Map GitHub topics to project tags
  - [ ] Define default tags for repositories without topics

- [ ] Implement sorting logic
  - [ ] Sort repositories by creation date, stars, or custom criteria
  - [ ] Group repositories by tags

- [ ] Add filtering endpoint
  - [ ] Create API parameter for filtering by tag
  - [ ] Implement filter logic in the API route

### 4. Update Frontend Components

- [ ] Modify ProjectsSection component
  - [ ] Update to fetch data from new API endpoint
  - [ ] Implement loading state while data is being fetched
  - [ ] Add error handling for API failures

- [ ] Enhance project filtering UI
  - [ ] Update ProjectTag component to work with dynamic tags
  - [ ] Ensure filter UI works with new data structure

- [ ] Update project cards
  - [ ] Ensure ProjectCard component works with the new data format
  - [ ] Add GitHub-specific information (stars, forks, etc.)

### 5. Testing and Deployment

- [ ] Test API functionality
  - [ ] Verify API returns correct data
  - [ ] Test error scenarios and edge cases
  - [ ] Verify caching works as expected

- [ ] Test frontend integration
  - [ ] Verify projects display correctly
  - [ ] Test filtering functionality
  - [ ] Ensure responsive design works with dynamic content

- [ ] Deploy updates
  - [ ] Update environment variables in production
  - [ ] Deploy changes to hosting platform (Vercel)

## Technical Details

### API Route Structure

The GitHub API route will be implemented as a Next.js API route handler:

```javascript
// src/app/api/github/route.js
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Cache for GitHub data
let cache = {
  data: null,
  timestamp: 0
};

// Cache expiration time (1 hour)
const CACHE_EXPIRATION = 60 * 60 * 1000;

export async function GET(req) {
  try {
    // Check if we have cached data that's still valid
    if (cache.data && (Date.now() - cache.timestamp) < CACHE_EXPIRATION) {
      return NextResponse.json(cache.data);
    }

    // Fetch repositories from GitHub
    const username = process.env.GITHUB_USERNAME;
    const { data: repos } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100
    });

    // Process repositories
    const projects = repos
      .filter(repo => !repo.fork) // Exclude forks
      .map(repo => ({
        id: repo.id,
        title: repo.name,
        description: repo.description || "",
        image: "/images/projects/default.png", // Default image
        tag: ["All", ...(repo.topics || [])],
        gitUrl: repo.html_url,
        previewUrl: repo.homepage || repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_at
      }));

    // Update cache
    cache = {
      data: projects,
      timestamp: Date.now()
    };

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories" },
      { status: 500 }
    );
  }
}
```

### Frontend Integration

The ProjectsSection component will be updated to fetch data from the new API:

```javascript
// src/app/components/ProjectsSection.jsx (updated)
"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [tag, setTag] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/github");
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (tag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => 
        project.tag.includes(tag)
      ));
    }
  }, [tag, projects]);

  // Rest of the component...
};

export default ProjectsSection;
```

## Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Octokit Documentation](https://github.com/octokit/rest.js)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
