import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// Initializing Github client with authentication
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

// In-memory cache
let cache = {
    data: null,
    timestamp: 0 // Make sure this matches the property name used in the check below
};

const CACHE_EXPIRATION = 60 * 60 * 1000;


/**
 *  t  Tranforms a GitHub repository object into a portfolio project format
 * @param {Object} repo - GitHub repository object.
 * @returns {Object} - Porfolio project object
*/

function mapRepoToProject(repo) {
    // Convert Github topics to tags
    const tags = ["All"];

    if (repo.topics && repo.topics.length > 0) {
        tags.push(...repo.topics);
    }

    if (repo.language) {
        tags.push(repo.language)
    }

    // Determine element type based on the topics or language
    let element = "earth"; // Default element

    // Safely check topics (might be undefined)
    const topics = repo.topics || [];

    if (topics.includes("web3") || repo.language === "Solidity") {
        element = "fire";
    } else if (topics.includes("web") || repo.language === "TypeScript" || repo.language === "JavaScript") {
        element = "water"
    } else if (topics.includes("ai") || topics.includes("ml")) {
        element = "air"
    }

    // Map repository to project format
    return {
        id: repo.id,
        title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
        description: repo.description || "No description provided",
        image: "/images/projects/default.png", // Default image
        tags: [...new Set(tags)], // Removes duplicates - renamed from 'tag' to 'tags' to match ProjectsSection
        tag: [...new Set(tags)], // Keep for backward compatibility
        gitUrl: repo.html_url,
        previewUrl: repo.homepage || repo.html_url,
        element: element,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_at
    };
}

/**
 * GET handler for Github repositories API
 */

export async function GET(req) {
    console.log('GitHub API route called'); // Debug: Log API call
    try {
        // Parse query parameters
        const url = new URL(req.url);
        const tagFilter = url.searchParams.get("tag");

        // Check if we have cached data that's still valid
        if (cache.data && (Date.now() - cache.timestamp) < CACHE_EXPIRATION) {
            console.log('Using cached data from:', new Date(cache.timestamp).toISOString());
            if (tagFilter && tagFilter !== "All") {
                const filtered = cache.data.filter(project =>
                    project.tag && project.tag.includes(tagFilter));
                return NextResponse.json(filtered)
            }
            return NextResponse.json(cache.data)
        }

        // Check for required environment variables
        const username = process.env.GITHUB_USERNAME;
        if (!username) {
            console.error('GITHUB_USERNAME environment variable is not set');
            throw new Error('GitHub username not configured');
        }

        if (!process.env.GITHUB_TOKEN) {
            console.warn('GITHUB_TOKEN environment variable is not set. Rate limiting may occur.');
        }

        // Fetch repositories from GitHub
        console.log(`Fetching repositories for user: ${username}`);
        const { data: repos } = await octokit.repos.listForUser({
            username,
            sort: "updated",
            per_page: 100,
            type: "owner" // Only include repos owned by the me
        });

        // Process repositories
        console.log('GitHub API response:', repos.length, 'repositories'); // Debug: Log API response
        const projects = repos.filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
        .map(mapRepoToProject);
        console.log('Processed projects:', projects.length); // Debug: Log processed projects

        // Update cache
        cache = {
            data: projects,
            timestamp: Date.now() // This should match the property name in the cache object
        };
        console.log('Cache updated:', cache.timestamp); // Debug: Log cache update

        // Apply tag filtering if provided
        if (tagFilter && tagFilter !== "All") {
            const filtered = projects.filter(project =>
                 project.tag.includes(tagFilter)
        );
        return NextResponse.json(filtered);
        }

        return NextResponse.json(projects);
        } catch (error) {
        console.error("Error fetching Github repositories:", error);
        return NextResponse.json(
            { error: "Failed to fetch Github repositories" },
            { status: 500 }
        );
    }

}
