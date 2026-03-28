import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <span className={styles.logoAccent}>P</span>ortfolio.
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
        <div className={styles.socials}>
          <a href="#" className={styles.socialLink}>GitHub</a>
          <a href="#" className={styles.socialLink}>LinkedIn</a>
          <a href="#" className={styles.socialLink}>Twitter</a>
        </div>
      </div>
    </footer>
  );
}
