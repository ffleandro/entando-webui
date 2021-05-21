import type { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import React from 'react';

import { Layout } from 'components/Layout';

const IndexPage: NextPage = () => {
  const [session, loading] = useSession();

  const loggedinState = session?.user ? (
    <span className="text-success">logged in</span>
  ) : (
    <span className="text-danger">NOT logged in</span>
  );

  const welcomeMessage = session?.user
    ? `Welcome back ${session.user.email ?? ''}!`
    : 'Welcome visitor. Please login to continue.';

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1 className="mt-5">Hello Next.js + Keycloak 👋</h1>
      <div className="mb-5 lead text-muted">
        This is an example of a Next.js site using Keycloak.
      </div>

      <p>You are: {loggedinState}</p>
      <p>{welcomeMessage}</p>
    </Layout>
  );
};

export default IndexPage;
