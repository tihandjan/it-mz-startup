// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  base_url: {
    apiBase: 'http://localhost:3000/api',
    signOutPath: 'auth/sign_out',
    signInPath: 'auth/sign_in',
    userTypes: [
        { name: 'ADMIN', path: 'admin' },
        { name: 'USER', path: 'user' }
    ]
  },
  root_url: 'http://localhost:3000/api'
};
