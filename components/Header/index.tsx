import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <img src="/entando.svg" alt="Entando Logo" className={styles.img} />
      </Link>
      <>
        <Link href="/profile">
          <a className="p-2 text-dark">Profile</a>
        </Link>
      </>
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

export default Header;
