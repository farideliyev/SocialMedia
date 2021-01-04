import React from 'react';
import styles from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogsItem'
import Messages from './Messages/Messages';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsContols';
import { required, maxLengthCreator } from '../../utils/validators.js/validator';
import {initialStateType} from "../../redux/dialogs-reducer";

const maxLength10=maxLengthCreator(10)

type PropsType = {
    dialogsPage: initialStateType,
    sendMessage: (messageText:string)=>void
}

type OwnPropsType = {}

export type NewMessageFormType={
    newMessageBody:string
}


const Dialogs: React.FC<PropsType> = (props) => {
    let state=props.dialogsPage;

    let newDialogsData=state.dialogsData.map(val=><DialogsItem name={val.name}  id={val.id}/>);
    let newMessagesData=state.messagesData.map(val=><Messages message={val.message} />);


   let addNewMessage=(values: NewMessageFormType)=>{
    props.sendMessage(values.newMessageBody);
   }


    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>

               {newDialogsData}

            </div>
            <div className={styles.messages}>

                {newMessagesData}

                <DialogsFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
    )
}

const  DialogsForm :React.FC<InjectedFormProps<NewMessageFormType, OwnPropsType> & OwnPropsType>
    = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newMessageBody"} 
            validate={[required, maxLength10]}
            />
            <button className={styles.button} >Click on me</button>
        </form>
    )
}

const DialogsFormRedux=reduxForm<NewMessageFormType, OwnPropsType>({
    form:"NewMessage"
})(DialogsForm)

export default Dialogs;