import React from 'react';
import  styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header= (props)=> {
  return (
       <header className={styles.header}>
          <img src='https://w7.pngwing.com/pngs/553/496/png-transparent-honda-logo-honda-logo-car-honda-accord-vin-diesel-celebrities-angle-text.png' />
          <div className={styles.loginBlock}>
            {props.isAuth 
            ? <div>{props.login}- <button onClick={props.logout}>Logout</button></div>
            :<NavLink to="/login">Login</NavLink>
            }
            
          </div>
       </header>
    
  );
}

export default Header;