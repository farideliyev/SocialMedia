import React, {useEffect, useImperativeHandle} from "react";
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
import { useHistory } from "react-router-dom";
import queryString from 'querystring';

type PropsType = {
}

type QueryParamsType = {
    term?: string,
    friend?: string,
    page?: string
}

export let Users: React.FC<PropsType> = React.memo(() => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{


        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
         let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend){

            case "true" :
                actualFilter={...actualFilter, friend: true}
                break;
            case "false":
                actualFilter={...actualFilter, friend: false}
                break;
            case "null":
                actualFilter={...actualFilter, friend: null}
                break;
        }


        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(()=>{
        const query : QueryParamsType= {}
        if(filter.term) query.term=filter.term
        if(filter.friend) query.friend=String(filter.friend)
        if(currentPage !==1) query.page=String(currentPage)
        debugger
        history.push({
            pathname: "/developers",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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