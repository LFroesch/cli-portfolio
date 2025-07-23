const express = require('express');
const router = express.Router();

// GitHub API integration
const GITHUB_USERNAME = 'LFroesch';
const GITHUB_API_BASE = 'https://api.github.com';

// Cache for GitHub data (5 minute cache)
let githubCache = {
  lastUpdated: null,
  data: null
};

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

function getFallbackData() {
  return {
    user: {
      name: 'Lucas Froeschner',
      bio: 'Full-Stack Developer',
      location: 'Offline',
      publicRepos: 0,
      followers: 0,
      following: 0,
      createdAt: new Date().toISOString(),
      avatarUrl: ''
    },
    stats: {
      totalRepos: 0,
      totalCommits: 0,
      totalPRs: 0,
      totalIssues: 0,
      currentStreak: 0,
      contributionsLast30Days: 0
    },
    recentCommits: [],
    topLanguages: [],
    recentRepos: []
  };
}

async function fetchGitHubData() {
  // Check cache first - return immediately if still valid
  if (githubCache.lastUpdated && (Date.now() - githubCache.lastUpdated) < CACHE_DURATION) {
    console.log(`Using cached GitHub data (${Math.round((Date.now() - githubCache.lastUpdated) / 1000 / 60)} minutes old)`);
    return githubCache.data;
  }

  console.log('Fetching fresh GitHub data...');
  
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
      console.log('Using GitHub token for higher rate limits');
    } else {
      console.log('No GitHub token - using public API (60 requests/hour)');
    }

    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, { headers });
    const userData = await userResponse.json();
    
    if (userData.message) {
      console.error('GitHub user API error:', userData.message);
      return getFallbackData();
    }

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=50`, { headers });
    const reposData = await reposResponse.json();
    
    if (!Array.isArray(reposData)) {
      console.error('GitHub repos API error:', reposData);
      return getFallbackData();
    }

    // Fetch recent events (commits, pushes, etc.)
    const eventsResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=30`, { headers });
    const eventsData = await eventsResponse.json();
    
    // Handle API errors (rate limits, etc.)
    if (!Array.isArray(eventsData)) {
      console.error('GitHub events API error:', eventsData);
      const fallbackEvents = [];
      return getFallbackData();
    }

    // Process recent commits from events
    const recentCommits = eventsData
      .filter(event => event.type === 'PushEvent')
      .slice(0, 10)
      .map(event => ({
        repo: event.repo.name,
        message: event.payload.commits?.[0]?.message || 'No message',
        date: event.created_at,
        sha: event.payload.commits?.[0]?.sha?.substring(0, 7) || 'unknown',
        url: `https://github.com/${event.repo.name}/commit/${event.payload.commits?.[0]?.sha || ''}`
      }));

    // Get detailed language stats from each repo
    const languageStats = {};
    for (const repo of reposData.slice(0, 20)) { // Limit to avoid rate limits
      try {
        const langResponse = await fetch(`${GITHUB_API_BASE}/repos/${repo.full_name}/languages`, { headers });
        if (langResponse.ok) {
          const languages = await langResponse.json();
          Object.entries(languages).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + bytes;
          });
        }
      } catch (error) {
        // Fallback to repo primary language
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1000;
        }
      }
    }

    // Calculate activity stats
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentActivity = eventsData.filter(event => 
      new Date(event.created_at) > thirtyDaysAgo
    );

    const commitCount = recentActivity.filter(event => event.type === 'PushEvent').length;
    const prCount = recentActivity.filter(event => event.type === 'PullRequestEvent').length;
    const issueCount = recentActivity.filter(event => event.type === 'IssuesEvent').length;

    // Current streak calculation (simplified)
    const commitDates = recentActivity
      .filter(event => event.type === 'PushEvent')
      .map(event => new Date(event.created_at).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort()
      .reverse();

    let currentStreak = 0;
    const todayStr = today.toDateString();
    const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString();

    if (commitDates.includes(todayStr) || commitDates.includes(yesterdayStr)) {
      let checkDate = commitDates.includes(todayStr) ? today : new Date(today.getTime() - 24 * 60 * 60 * 1000);
      
      for (const dateStr of commitDates) {
        if (dateStr === checkDate.toDateString()) {
          currentStreak++;
          checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
        } else {
          break;
        }
      }
    }

    const compiledData = {
      user: {
        name: userData.name,
        bio: userData.bio,
        location: userData.location,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        createdAt: userData.created_at,
        avatarUrl: userData.avatar_url
      },
      stats: {
        totalRepos: userData.public_repos,
        totalCommits: commitCount,
        totalPRs: prCount,
        totalIssues: issueCount,
        currentStreak,
        contributionsLast30Days: recentActivity.length
      },
      recentCommits,
      topLanguages: Object.entries(languageStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6)
        .map(([lang, bytes]) => {
          const totalBytes = Object.values(languageStats).reduce((sum, b) => sum + b, 0);
          return { 
            language: lang, 
            bytes,
            percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0
          };
        }),
      recentRepos: reposData.slice(0, 5).map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url
      }))
    };

    // Update cache
    githubCache = {
      lastUpdated: Date.now(),
      data: compiledData
    };

    return compiledData;
  } catch (error) {
    console.error('GitHub API Error:', error);
    
    // Return cached data if available, otherwise return fallback
    if (githubCache.data) {
      return githubCache.data;
    }
    
    return getFallbackData();
  }
}

// Get GitHub stats
router.get('/stats', async (req, res) => {
  try {
    const data = await fetchGitHubData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
});

// Cache for activity data
let activityCache = {
  lastUpdated: null,
  data: null
};

// Get coding activity for the last 30 days
router.get('/activity', async (req, res) => {
  try {
    // Check cache first
    if (activityCache.lastUpdated && (Date.now() - activityCache.lastUpdated) < CACHE_DURATION) {
      console.log(`Using cached activity data (${Math.round((Date.now() - activityCache.lastUpdated) / 1000 / 60)} minutes old)`);
      return res.json(activityCache.data);
    }

    console.log('Fetching fresh activity data...');
    
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const eventsResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`, { headers });
    const events = await eventsResponse.json();

    // Handle API errors
    if (!Array.isArray(events)) {
      console.error('GitHub activity API error:', events);
      return res.json({ activity: [] });
    }

    // Group events by date for activity chart
    const activityMap = {};
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    events
      .filter(event => new Date(event.created_at) > thirtyDaysAgo)
      .forEach(event => {
        const date = new Date(event.created_at).toDateString();
        if (!activityMap[date]) {
          activityMap[date] = { commits: 0, prs: 0, issues: 0, total: 0 };
        }
        
        if (event.type === 'PushEvent') {
          activityMap[date].commits += event.payload.commits?.length || 1;
        } else if (event.type === 'PullRequestEvent') {
          activityMap[date].prs += 1;
        } else if (event.type === 'IssuesEvent') {
          activityMap[date].issues += 1;
        }
        activityMap[date].total += 1;
      });

    // Convert to array and fill missing dates
    const activityArray = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toDateString();
      activityArray.push({
        date: dateStr,
        ...activityMap[dateStr] || { commits: 0, prs: 0, issues: 0, total: 0 }
      });
    }

    const result = { activity: activityArray };
    
    // Cache the result
    activityCache = {
      lastUpdated: Date.now(),
      data: result
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    
    // Return cached data if available
    if (activityCache.data) {
      console.log('Returning cached activity data due to error');
      return res.json(activityCache.data);
    }
    
    // Otherwise return empty data
    res.json({ activity: [] });
  }
});

module.exports = router;