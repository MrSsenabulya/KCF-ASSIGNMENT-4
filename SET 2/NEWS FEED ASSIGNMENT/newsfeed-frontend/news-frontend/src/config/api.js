// Strapi API Configuration
export const API_CONFIG = {
  // Base URL for Strapi API 
  BASE_URL: import.meta.env.VITE_STRAPI_BASE_URL || 'http://localhost:1337/api',
  
  // Base URL for Strapi media files 
  MEDIA_BASE_URL: import.meta.env.VITE_STRAPI_MEDIA_BASE_URL || 'http://localhost:1337',
  
  
  API_TOKEN: import.meta.env.VITE_STRAPI_API_TOKEN || '3bf9341f4663e78543bae2474d49bbd3a15780bc7ebe0d4ec59a0efdb760be55b8531fbb35673f4912b571363489f7f12da8c599563a2f8d8b1d72d98e8fae92cef569b4a3c8da5a39070aba9598223f2694680d28f24091a679ea5157238026afb486f21d429f8c8d50d744b51cf70cc80e8b6bd23c423368a9ac9be50659cf',
  
  // Headers for authenticated requests
  getHeaders() {
    return {
      'Authorization': `Bearer ${this.API_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }
};

// Debug function to check configuration
export const debugConfig = () => {
  console.log('API Configuration:', {
    BASE_URL: API_CONFIG.BASE_URL,
    MEDIA_BASE_URL: API_CONFIG.MEDIA_BASE_URL,
    HAS_TOKEN: !!API_CONFIG.API_TOKEN && API_CONFIG.API_TOKEN !== 'YOUR_STRAPI_API_TOKEN',
    TOKEN_PREVIEW: API_CONFIG.API_TOKEN ? `${API_CONFIG.API_TOKEN.substring(0, 10)}...` : 'No token'
  });
};

// Helper function to create authenticated axios instance
export const createAuthenticatedRequest = (axios) => {
  return axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: API_CONFIG.getHeaders(),
  });
};
