# GitHub API Route Documentation

This document provides detailed information about the GitHub API route implementation for the portfolio project. It expands on the implementation steps outlined in the main documentation.

## Overview

The GitHub API route (`src/app/api/github/route.js`) serves as a bridge between your portfolio application and the GitHub API. It fetches your repositories, processes them into a format suitable for your portfolio, and provides caching to improve performance and respect GitHub's rate limits.

## Implementation Details

### 1. Imports and Setup

```javascript
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// Initialize GitHub client with authentication
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});
```

The implementation uses:
- `NextResponse` from Next.js for API responses
- `Octokit` client for GitHub API interactions
- Environment variables for secure authentication

### 2. Caching Mechanism

```javascript
// Simple in-memory cache
let cache = {
  data: null,
  timestamp: 0
};

// Cache expiration time (1 hour)
const CACHE_EXPIRATION = 60 * 60 * 1000;
```

The caching system:
- Stores processed repository data in memory
- Includes a timestamp to track when the cache was last updated
- Expires after 1 hour to ensure data freshness while minimizing API calls

### 3. Repository Processing

The API transforms GitHub repository data into a format that matches the portfolio's project structure:

```javascript
function mapRepoToProject(repo) {
  // Convert GitHub topics to tags
  const tags = ["All"];
  
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics);
  }
  
  if (repo.language) {
    tags.push(repo.language);
  }
  
  // Map repository to project format
  return {
    id: repo.id,
    title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
    description: repo.description || "No description provided",
    image: "/images/projects/default.png", // Default image
    tag: [...new Set(tags)], // Remove duplicates
    gitUrl: repo.html_url,
    previewUrl: repo.homepage || repo.html_url,
    // Additional GitHub-specific data
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    updatedAt: repo.updated_at
  };
}
```

This transformation:
- Converts repository names to a more readable format (replacing hyphens and underscores with spaces)
- Creates tags from GitHub topics and the repository language
- Provides default values for missing fields
- Includes additional GitHub-specific data like star count and language

### 4. GET Handler

The main API handler processes requests and returns repository data:

```javascript
export async function GET(req) {
  try {
    // Parse query parameters for potential filtering
    const url = new URL(req.url);
    const tagFilter = url.searchParams.get("tag");
    
    // Check if we have cached data that's still valid
    if (cache.data && (Date.now() - cache.timestamp) < CACHE_EXPIRATION) {
      // Apply filtering to cached data if needed
      if (tagFilter && tagFilter !== "All") {
        const filtered = cache.data.filter(project => 
          project.tag.includes(tagFilter)
        );
        return NextResponse.json(filtered);
      }
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
```

The handler:
- Checks for and respects query parameters for filtering
- Uses cached data when available and valid
- Fetches fresh data from GitHub when needed
- Filters out forks and archived repositories
- Processes repositories into the portfolio format
- Updates the cache with new data
- Handles errors gracefully

## Advanced Features

### 1. Tag-Based Filtering

The API supports filtering projects by tag using query parameters:

```
/api/github?tag=react
```

This allows the frontend to request only projects with specific tags, enabling dynamic filtering without refetching all data.

### 2. Automatic Element Assignment

The implementation can be extended to automatically assign "element" properties based on repository topics or language:

```javascript
// Determine element type based on topics or language
let element = "earth"; // Default element

if (repo.topics.includes("web3") || repo.language === "Solidity") {
  element = "fire";
} else if (repo.topics.includes("web") || repo.language === "JavaScript" || repo.language === "TypeScript") {
  element = "water";
} else if (repo.topics.includes("ai") || repo.topics.includes("ml")) {
  element = "air";
}

// Add to return object
return {
  // ... other properties
  element: element,
};
```

This feature enhances the visual categorization of projects in the portfolio.

## Error Handling

The implementation includes comprehensive error handling:

```javascript
try {
  // API logic
} catch (error) {
  console.error("Error fetching GitHub repositories:", error);
  return NextResponse.json(
    { error: "Failed to fetch GitHub repositories" },
    { status: 500 }
  );
}
```

This ensures:
- Errors are logged for debugging
- The client receives a proper error response
- The application remains stable even when GitHub API issues occur

## Performance Considerations

### 1. Caching

The caching mechanism significantly improves performance by:
- Reducing the number of API calls to GitHub
- Decreasing response time for repeated requests
- Helping to avoid GitHub's API rate limits

### 2. Selective Data Processing

The implementation only processes necessary data:
- Filters out forks and archived repositories
- Transforms only the properties needed for the portfolio
- Applies filtering at the earliest possible stage

## Security Considerations

### 1. Environment Variables

The implementation uses environment variables for sensitive information:
- GitHub token is never exposed in the code
- GitHub username is configurable without code changes

### 2. Error Handling

Error messages are sanitized to prevent leaking sensitive information:
- Detailed errors are logged server-side only
- Generic error messages are returned to the client

## Testing the API

To test the API endpoint:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the API endpoint:
   ```
   http://localhost:3000/api/github
   ```

3. Test filtering by adding a tag parameter:
   ```
   http://localhost:3000/api/github?tag=react
   ```

4. Verify the JSON response contains the expected repository data

## Integration with Frontend

The API is designed to seamlessly integrate with the portfolio's frontend:
- Data structure matches the existing project components
- Tag-based filtering supports the UI's filtering functionality
- Element assignments enhance the visual presentation

## Conclusion

This GitHub API route implementation provides a robust, performant, and secure way to dynamically fetch and display your GitHub repositories in your portfolio. By leveraging caching, error handling, and data transformation, it ensures a smooth user experience while maintaining code quality and security.
