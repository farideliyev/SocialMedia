import React, {ChangeEvent} from 'react';
;

type PropsType={
    status:string
    updateStatus:(newStatus:string)=>void
}

type StateType={
    editMode: boolean
    status: string
}

class ProfileSatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    changer = () => {
        this.setState({
            editMode: true
        })
    }

    deactivation = () => {
        this.setState({
            editMode: false
        })

    }
    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
        this.props.updateStatus(e.currentTarget.value)
    }

    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.changer}>{this.props.status || "---"}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivation} value={this.state.status} />
                </div>
            }

        </>
    }
}

export default ProfileSatus;