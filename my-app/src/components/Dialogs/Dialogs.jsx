import React from 'react';
import styles from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogsItem'
import Messages from './Messages/Messages';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsContols';
import { required, maxLengthCreator } from '../../utils/validators.js/validator';

const maxLength10=maxLengthCreator(10)

const Dialogs = (props) => {
    let state=props.dialogsPage;

    let newDialogsData=state.dialogsData.map(val=><DialogsItem name={val.name}  id={val.id}/>);
    let newMessagesData=state.messagesData.map(val=><Messages message={val.message} />);


   let addNewMessage=(values)=>{
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

const DialogsForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newMessageBody"} 
            validate={[required, maxLength10]}
            />
            <button className={styles.button} >Click on me</button>
        </form>
    )
}

const DialogsFormRedux=reduxForm({
    form:"NewMessage"
})(DialogsForm)

export default Dialogs;