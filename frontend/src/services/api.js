const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5051/api';

class APIService {
  // No more session tracking - using global stats only

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let data;
      if (isJson) {
        data = await response.json();
      } else {
        // Handle non-JSON responses (like HTML error pages)
        const text = await response.text();
        data = { error: text.slice(0, 100) + (text.length > 100 ? '...' : '') };
      }
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Analytics endpoints
  async trackVisit() {
    try {
      return await this.request('/analytics/track-visit', {
        method: 'POST',
        body: {}
      });
    } catch (error) {
      console.error('Failed to track visit:', error);
      return null;
    }
  }

  async trackProjectView(projectName) {
    try {
      return await this.request('/analytics/track-project', {
        method: 'POST',
        body: { projectName }
      });
    } catch (error) {
      console.error('Failed to track project view:', error);
      return null;
    }
  }

  async trackSectionView(sectionName) {
    try {
      return await this.request('/analytics/track-section', {
        method: 'POST',
        body: { sectionName }
      });
    } catch (error) {
      console.error('Failed to track section view:', error);
      return null;
    }
  }

  async getStats() {
    try {
      return await this.request('/analytics/stats');
    } catch (error) {
      console.error('Failed to get stats:', error);
      return {
        totalVisitors: 0,
        totalSessions: 0,
        topProjects: [],
        topSections: [],
        recentVisitors: []
      };
    }
  }

  // Contact endpoint
  async sendContactMessage(messageData) {
    try {
      return await this.request('/contact/send', {
        method: 'POST',
        body: messageData
      });
    } catch (error) {
      console.error('Failed to send contact message:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      // Use stats endpoint instead of /health since /health doesn't exist in production
      const response = await fetch(`${API_BASE_URL}/analytics/stats`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default new APIService();