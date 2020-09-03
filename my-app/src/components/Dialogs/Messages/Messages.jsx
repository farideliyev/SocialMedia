import React from 'react';
import styles from '../Dialogs.module.css'


const Messages=(props)=>{
    return(
        <div>
        <div 
          className={styles.message}>{props.message}
        </div>
      
        </div>

        

        
        
    )
}

export default Messages