// server/config.js
module.exports = {
  AUTH0_DOMAIN: 'fgt.auth0.com', // e.g., kmaida.auth0.com
  AUTH0_API_AUDIENCE: 'https://fgt.auth0.com/api/v2/', // e.g., 'http://localhost:8083/api/'
  MONGO_URI: (process.env.MONGODB_URI || 'mongodb://localhost:27017/fbd'),
  NAMESPACE: 'https://fallgolftrip.com/roles'
};

