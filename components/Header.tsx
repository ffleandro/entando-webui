import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import * as React from 'react';

export const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <Link href="/">
        <a className="my-0 mr-md-auto font-weight-bold text-dark">Next.js + Keycloak</a>
      </Link>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link href="/profile">
          <a className="p-2 text-dark">Profile</a>
        </Link>
      </nav>
      {console.log(session)}
      {session?.user ? (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-danger"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-success"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  );
};
