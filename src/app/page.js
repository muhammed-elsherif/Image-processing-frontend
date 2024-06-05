import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Image Resizer</h1>
      <Link href="/upload" legacyBehavior>
        <a className={styles.link}>Go to Upload Page</a>
      </Link>
    </div>
  );
};

export default Home;
