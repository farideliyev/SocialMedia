import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({currentPage, users,totalUsersCount, pageSize, onPageChanged,...props}) => {
 
    return (

        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize} 
            />
            {
                users.map(u =>
                <User key={u.id} followingInProgress={props.followingInProgress} user={u}
                      followThunkCreator={props.followThunkCreator}
                      unfollowThunkCreator={props.unfollowThunkCreator}
                
                />
                   )

            }

        </div>
    )

}


export default Users