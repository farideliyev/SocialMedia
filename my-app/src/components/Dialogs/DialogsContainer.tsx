import React from 'react';
import Dialogs from "./Dialogs"
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {actions} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";



let mapStateToProps=(state: AppStateType)=>{
    return{
        dialogsPage: state.dialogsPage
    }
}



export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs);