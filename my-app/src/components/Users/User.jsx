import React from "react";
import s from './Users.module.css';
import userPhoto from "../../assets/images/userPhoto.png"
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, unfollowThunkCreator, followThunkCreator }) => {
    let u = user;
    return (
        <div>
            <div>
                <NavLink to={'/profile/' + u.id}>
                    <img className={s.photo} src={u.photos.small != null ? u.photos.small : userPhoto} />
                </NavLink>
            </div>
            <div>
                {u.followed
                    ? <button disabled={followingInProgress.some(id => id === u.id)}
                        onClick={() => {
                            unfollowThunkCreator(u.id)

                        }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === u.id)}
                        onClick={() => {
                            followThunkCreator(u.id)
                        }}>Follow</button>}
            </div>
            <div>
                <div>{u.name}</div>
                <div>{u.status}</div>
            </div>
            <div>
                <div>{"u.location.city"}</div>
                <div>{"u.location.country"}</div>
            </div>

        </div>

    )
}


export default User