// Configuration de l'API
const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_PYTHON_API_URL || 'http://localhost:5000/api',
    TIMEOUT: 10000, // 10 secondes
    RETRY_ATTEMPTS: 3
  };
  
  export default API_CONFIG; 