// Test file for GitHub API
import { Octokit } from "@octokit/rest";

// This is a simple test script to check if the GitHub API is working
// You can run it with: node src/app/api/github/test.js

async function testGitHubAPI() {
  try {
    console.log('Testing GitHub API...');
    
    // Initialize GitHub client with authentication
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    
    // Fetch repositories from GitHub
    const username = process.env.GITHUB_USERNAME;
    console.log('Fetching repositories for:', username);
    
    const { data: repos } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
      type: "owner"
    });
    
    console.log('Found', repos.length, 'repositories');
    
    // Process repositories
    const projects = repos
      .filter(repo => !repo.fork && !repo.archived)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided",
        url: repo.html_url
      }));
    
    console.log('Processed', projects.length, 'projects');
    console.log('First project:', projects[0]);
    
    return projects;
  } catch (error) {
    console.error('Error testing GitHub API:', error);
    return null;
  }
}

// Run the test
testGitHubAPI();
