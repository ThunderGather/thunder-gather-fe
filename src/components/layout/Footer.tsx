import styles from './Footer.module.css';
import React from "react";
import { TbHome, TbCategory, TbPencilBolt } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const isActivePath = (targetPaths: string[]) => {
    return targetPaths.includes(path);
  };

  const iconStyle = (targetPaths: string[]) => ({
    color: isActivePath(targetPaths) ? '#F7DF66' : 'white',
  });

  const circleStyle = (targetPaths: string[]) => ({
    backgroundColor: isActivePath(targetPaths) ? '#F7DF66' : 'transparent',
  });

  // Hide the Footer on /login, /signup, /post/create, and /post/edit routes
  if (['/login', '/signup', '/post/create', '/post/edit'].includes(path)) {
    return null;
  }

  return (
      <div className={styles.layout}>
        <nav className={styles.menu}>
          <div className={styles.menuNavBar} onClick={() => navigate('/')} style={iconStyle(['/'])}>
            <TbHome className={styles.icon} />
            <div className={styles.menuCircle} style={circleStyle(['/'])}></div>
          </div>
          <div className={styles.menuNavBar} onClick={() => navigate('/post')} style={iconStyle(['/post'])}>
            <TbCategory className={styles.icon} />
            <div className={styles.menuCircle} style={circleStyle(['/post'])}></div>
          </div>
          <div className={styles.menuNavBar} onClick={() => navigate('/post/create')} style={iconStyle(['/post/create'])}>
            <TbPencilBolt className={styles.icon} />
            <div className={styles.menuCircle} style={circleStyle(['/post/create'])}></div>
          </div>
          <div className={styles.menuNavBar} onClick={() => navigate('/profile')} style={iconStyle(['/profile', '/notices'])}>
            <CgProfile className={styles.icon} />
            <div className={styles.menuCircle} style={circleStyle(['/profile', '/notices'])}></div>
          </div>
        </nav>
      </div>
  );
};

export default Footer;
