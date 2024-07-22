import React from 'react';
import styles from './Layout.module.css';
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
      <div className={styles.footerContainer}>
      <Footer />
      </div>
    </div>
  );
};

export default Layout;