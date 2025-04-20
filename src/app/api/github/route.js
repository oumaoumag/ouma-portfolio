import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

// Initializing Github client with authentication
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

// In-memory cache
let cache = {
    data: null,
    timeStamp: 0
};

const CACHE_EXPIRATION = 60 * 60 * 1000;


/**
 *  t  Tranforms a GitHub repository object into a portfolio project format
 * @param {Object} repo - GitHub repository object.
 * @returns {Object} - Porfolio project object
*/

function mapRepoToProject(repo) {
    // Convert Github topics to tags
    const tags = ["all"];

    if (repo.topics && repo.topics.length > 0) {
        tags.push(...repo.topics);
    }

    if (repo.language) {
        top.push(repo.language)
    }

    // Determine element type based on the topics or language
    let element = "earth"; // Default element
    
    if (repo.topics.includes("web3") || repo.language === "Solidity") {
        element = "fire";
    } else if (repo.topics.includes ("web") || repo.language === "TypeScript" || repo.language === "JavaScript") {
        element = "water"
    } else if (repo.topics.includes("ai") || repo.topics.includes("ml")) {
        element = "air"
    }

    // Map repository to project format 
    return {
        id: repo.id, 
        title: repo.name.replace(/ -/g, " ", replace(/ _/g, " ")),
        description: repo.description || "No description provided", 
        image: "/images/projects/default.png", // Default image
        tag: [...new  Set(tags)], // Removes duplicates
        gitUrl: repo.html_url,
        previewUrl: repo.homepage || repo.html_url,
        element: element,
        stars: repo.stargazes_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_At
    };
}