import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {getIsFetching} from "../../redux/users-selectors";


export const UserPage : React.FC= () => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader/>:null}
        <Users/>
    </>
}

