import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../redux/types/types";

type PropsType={
    totalUsersCount:number
    pageSize: number
    portionSize?:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    users: Array<UserType>
    followingInProgress: Array<number>
    followThunkCreator:(userId:number)=>void
    unfollowThunkCreator:(userId:number)=>void

}

let Users:React.FC<PropsType> = ({currentPage, users,totalUsersCount, pageSize, onPageChanged,...props}) => {
 
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