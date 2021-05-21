import NextAuth from 'next-auth';

import { keycloakCfg } from 'components/keycloak.tsx';

export default NextAuth({
  providers: [
    {
      id: 'entando',
      name: 'Entando',
      type: 'oauth',
      version: '2.0',
      scope: 'profile openid email',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: `${keycloakCfg.url}/realms/${keycloakCfg.realm}/protocol/openid-connect/token`,
      authorizationUrl: `${keycloakCfg.url}/realms/${keycloakCfg.realm}/protocol/openid-connect/auth?response_type=code`,
      profileUrl: `${keycloakCfg.url}/realms/${keycloakCfg.realm}/protocol/openid-connect/userinfo`,
      async profile(profile) {
        return {
          id: profile.preferred_username,
          preferred_username: profile.preferred_username,
          name: '',
          email: profile.preferred_username,
          image: '',
        };
      },
      clientId: 'entando-web',
      callbacks: {
        async session(session, user) {
          return session;
        },
        async redirect(url, baseUrl) {
          return url;
        },
      },
    },
  ],
  debug: process.env.WEBUI_DEBUG || false,
  secret: process.env.APP_SECRET,
  session: {
    // More information at: https://next-auth.js.org/configuration/options#session
    jwt: true,
    maxAge: 24 * 60 * 60, //24 hours
  },
});
