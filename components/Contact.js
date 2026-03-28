import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h3 className={styles.subtitle}>Let's talk about everything!</h3>
            <p className={styles.text}>
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.icon}>✉</span> hello@myportfolio.com
              </div>
              <div className={styles.detailItem}>
                <span className={styles.icon}>📞</span> +1 234 567 890
              </div>
              <div className={styles.detailItem}>
                <span className={styles.icon}>📌</span> San Francisco, CA
              </div>
            </div>
          </div>
          
          <div className={`card ${styles.formWrapper}`}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input type="text" className="input" placeholder="Your name" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" className="input" placeholder="Your email" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <textarea className="textarea" rows="4" placeholder="How can I help you?"></textarea>
              </div>
              <button type="button" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
