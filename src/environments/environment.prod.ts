export const environment = {
  production: true,
  base_url: {
    apiBase: 'http://localhost:3000/api',
    signOutPath: 'auth/sign_out',
    userTypes: [
        { name: 'ADMIN', path: 'admin' },
        { name: 'USER', path: 'user' }
    ]
  },
  root_url: 'http://localhost:3000/api'
};
