export const environment = {
  production: true,
  base_url: {
    apiBase: 'http://localhost:3000/api',
    signInPath: 'admin_auth/sign_in',
    signOutPath: 'admin_auth/sign_out',
    validateTokenPath: 'admin_auth/validate_token'
  },
  user_base_url: {
    apiBase: 'http://localhost:3000/api'
  },
  root_url: 'http://localhost:3000/api'
};
