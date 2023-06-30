import axios from 'axios';

import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../config/envConfig.js';

// Renews the access token using the provided refresh token
async function accessTokenRenew(refreshToken) {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      refresh_token: refreshToken,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      grant_type: 'refresh_token',
    });

    const { access_token } = response.data;

    // Return the new access token
    return access_token;
  } 
  catch (error) {
    console.error('Error refreshing access token:', error.message);
  }
}

// Checks if the access token has expired or is about to expire
function checkExpired(expirationTime) {
  // The token is expired or is about to expire
  if(expirationTime < Date.now() || expirationTime > Date.now() - 120000) return true;

  return false;
}

export { accessTokenRenew, checkExpired };
