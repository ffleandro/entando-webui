import Head from 'next/head';
import CardGridWidget from '../components/widgets/cardgrid.jsx';
import styles from '../styles/Home.module.css';

export default function Home({ cards }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Entando</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <CardGridWidget cards={cards} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const cards = [
    {
      title: 'Documentation',
      description: 'Find in-depth information about Next.js features and API.',
      link: 'breno',
    },
    {
      title: 'Learn',
      description: 'Learn about Next.js in an interactive course with quizzes!',
      link: 'https://nextjs.org/learn',
    },
    {
      title: 'Documentation',
      description: 'Find in-depth information about Next.js features and API.',
      link: 'https://github.com/vercel/next.js/tree/master/examples',
    },
    {
      title: 'Deploy',
      description:
        'Instantly deploy your Next.js site to a public URL with Vercel.',
      link:
        'https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    },
  ];

  /* Promise.all(datasources)

  const res = await fetch(
    'https://entando-de-app-url.com/api/cms/contents/NWS123'
  );
  const contents = await res.json(); */

  return {
    props: {
      cards,
      // contents,
    },
  };
}
