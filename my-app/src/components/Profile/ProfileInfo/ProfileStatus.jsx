import React from 'react';
;


class ProfileSatus extends React.Component {
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
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
        this.props.updateStatus(e.currentTarget.value)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
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