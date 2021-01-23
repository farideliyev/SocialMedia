import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followThunkCreator, getUsersThunkCreator, unfollowThunkCreator} from "../../redux/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

type PropsType = {
}

export let Users: React.FC<PropsType> = React.memo(() => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUsersThunkCreator(currentPage, pageSize,filter))
    }, [])

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }

    const onPageChanged = (pageNumber:number) => {
        dispatch(getUsersThunkCreator(pageNumber,pageSize, filter))

    }

    const follow = (userId: number) =>{
        dispatch(followThunkCreator(userId))
    }

    const unfollow = (userId: number) =>{
        dispatch(unfollowThunkCreator(userId))
    }
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                           totalUsersCount={totalUsersCount} pageSize={pageSize}
                />
                {
                    users.map(u =>
                        <User key={u.id} followingInProgress={followingInProgress} user={u}
                              followThunkCreator={follow}
                              unfollowThunkCreator={unfollow}

                        />
                    )

                }

            </div>
        </div>
    )

})

export default Users