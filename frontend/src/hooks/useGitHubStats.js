import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5011/api';

export const useGitHubStats = () => {
  const [githubData, setGithubData] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch GitHub stats
      const statsResponse = await fetch(`${API_BASE}/github/stats`);
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch GitHub stats');
      }
      const statsData = await statsResponse.json();

      // Fetch activity data
      const activityResponse = await fetch(`${API_BASE}/github/activity`);
      if (!activityResponse.ok) {
        throw new Error('Failed to fetch GitHub activity');
      }
      const activityData = await activityResponse.json();

      setGithubData(statsData);
      setActivity(activityData.activity);
    } catch (err) {
      console.error('GitHub Stats Error:', err);
      setError(err.message);
      
      // Set fallback data
      setGithubData({
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
      });
      setActivity([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchGitHubStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    githubData,
    activity,
    loading,
    error,
    refresh: fetchGitHubStats
  };
};