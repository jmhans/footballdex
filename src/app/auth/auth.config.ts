// src/app/auth/auth.config.ts
import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'O4WkC6dEBPid3R06GZyeoJL7M6ZPaK4F',
  CLIENT_DOMAIN: 'fgt.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'https://fgt.auth0.com/api/v2/', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile',
  NAMESPACE: 'https://fallgolftrip.com/roles'
};