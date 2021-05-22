import type { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import React from 'react';

import { Layout } from 'components/Layout';

const ProfilePage: NextPage = () => {
  const [session, loading] = useSession();

  const welcomeMessage = session?.user
    ? `Welcome back ${session.user.email ?? ''}!`
    : 'Welcome visitor. Please login to continue.';

  const profile = session?.user ? (
    <>
      <p>You are: <span className="text-success">logged in</span></p>
      <p>{welcomeMessage}</p>
      <ul>
        <li>
          <span className="font-weight-bold mr-1">Email:</span>
          <span className="text-muted">{session.user.email ?? ''}</span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">Username:</span>
          <span className="text-muted">{session.user.preferred_username ?? ''}</span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">Name:</span>
          <span className="text-muted">{session.user.name ?? ''}</span>
        </li>
      </ul>
    </>
  ) : (
    <span className="text-danger">NOT logged in</span>
  );

  return (
    <Layout title="Profile | Next.js + Keycloak Example">
      <h1 className="my-5">User Profile</h1>
      {profile}
    </Layout>
  );
};

export default ProfilePage;
