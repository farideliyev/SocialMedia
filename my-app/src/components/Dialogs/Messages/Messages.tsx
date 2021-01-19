import React from 'react';
import styles from '../Dialogs.module.css'

type PropsType={
    message: string
}
const Messages :React.FC<PropsType>=(props)=>{
    return(
        <div>
        <div 
          className={styles.message}>{props.message}
        </div>
      
        </div>

        

        
        
    )
}

export default Messages