export const environment = {
  production: true,
  base_url: {
    apiBase: 'https://it-mz-startup.herokuapp.com/api/v1',
    signOutPath: 'auth/sign_out',
    signInPath: 'auth/sign_in',
    validateTokenPath: 'auth/validate_token',
    userTypes: [
        { name: 'ADMIN', path: 'admin' },
        { name: 'USER', path: 'user' }
    ]
  },
  root_url: 'https://it-mz-startup.herokuapp.com'
};