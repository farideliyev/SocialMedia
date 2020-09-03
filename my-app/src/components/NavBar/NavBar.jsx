import React from 'react';
import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar= ()=> {
  return (
        <nav className={styles.nav}>
            <div className={styles.item}>
             <NavLink to="/profile" activeClassName={styles.active}>Profile</NavLink>
            </div>
            <div className={styles.item}>
              <NavLink to="/dialogs" activeClassName={styles.active}>Messages</NavLink> 
            </div>
            <div className={styles.item}>
              <NavLink to="/users" >Users</NavLink> 
            </div>
            <div className={styles.item}>
                  <a href="/news">News</a> 
            </div>
            <div className={styles.item}>
               <a href="/music">Music</a>
            </div>
            <div className={styles.item}>
               <a href="/settings">Settings</a>
              </div>
      </nav>
    
    
  );
}

export default NavBar;