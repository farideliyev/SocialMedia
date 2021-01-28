import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/user-reducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../redux/users-selectors";


const usersSearchValidateForm = (values: any) => {
    const errors = {};
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormFriendType = "null" | "true" | "false";
type FormType = {
    term: string
    friend : FormFriendType
}
export const UsersSearchForm: React.FC<PropsType> = (props) => {

    const filter = useSelector(getFilter)

    let submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter : FilterType = {
            term : values.term,
            friend : values.friend==="null" ? null : values.friend==="true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FormFriendType}}
            validate={usersSearchValidateForm}
            onSubmit={submit}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>

                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )
            }
        </Formik>
    )
}