import {combineReducers, createStore, applyMiddleware} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import userReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";


let reducers=combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    app:appReducer,
    form: formReducer

});

type RootReducerType = typeof reducers
export type AppStateType = ReturnType <RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key:string]: (...args:any)=>any} >=ReturnType<PropertiesTypes<T>>

let store=createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store=store;

export default store;