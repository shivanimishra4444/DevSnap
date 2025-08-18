/**
 * Authentication utility functions
 */

export const buildGitHubAuthUrl = (clientId: string, callbackUrl: string, state: string): string => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    scope: 'user:email',
    state: state,
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const generateOAuthState = (): string => {
  return Math.random().toString(36).substring(7);
};

export const getGitHubConfig = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const callbackUrl = import.meta.env.VITE_GITHUB_CALLBACK_URL;
  
  if (!clientId) {
    throw new Error('VITE_GITHUB_CLIENT_ID environment variable is required');
  }
  
  if (!callbackUrl) {
    throw new Error('VITE_GITHUB_CALLBACK_URL environment variable is required');
  }
  
  return { clientId, callbackUrl };
};
