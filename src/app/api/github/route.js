import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// Initializing Github client with authentication
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

// In-memory cache
let cache = {
    data: null,
    timestamp: 0
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

    if (repo.topics.includes("web3") || repo.language === "Solidity") {
        element = "fire";
    } else if (repo.topics.includes("web") || repo.language === "TypeScript" || repo.language === "JavaScript") {
        element = "water"
    } else if (repo.topics.includes("ai") || repo.topics.includes("ml")) {
        element = "air"
    }

    // Map repository to project format
    return {
        id: repo.id,
        title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
        description: repo.description || "No description provided",
        image: "/images/projects/web3.png", // Updated default image
        tag: [...new Set(tags)], // Removes duplicates
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
    try {
        // Parse query parameters
        const url = new URL(req.url);
        const tagFilter = url.searchParams.get("tag");

        // Check if we have cached data that's still valid
        if (cache.data && (Date.now() - cache.timestamp) < CACHE_EXPIRATION) {
            if (tagFilter && tagFilter !== "All") {
                const filtered = cache.data.filter
                    (project => project.tag.includes(tagFilter));
                return NextResponse.json(filtered)
            }
            return NextResponse.json(cache.data)
        }

        // Fetch repositories from GitHub
        const username = process.env.GITHUB_USERNAME;
        const { data: repos } = await octokit.repos.listForUser({
            username,
            sort: "updated",
            per_page: 100,
            type: "owner" // Only include repos owned by the me
        });

        // Process repositories
        const projects = repos.filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
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
        console.error("Error fetching Github repositories:", error);
        return NextResponse.json(
            { error: "Failed to fetch Github repositories" },
            { status: 500 }
        );
    }

}
