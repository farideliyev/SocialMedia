import React from 'react';
import styles from '../Dialogs.module.css'
import { NavLink } from 'react-router-dom';

type PropsType={
    id: number
    name: string
}

const DialogsItem: React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={`${styles.dialogs} ${styles.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;