import * as React from 'react';

class ChangePasswordModal extends React.Component<any,any> {
    constructor() {
        super();
        this.state = {
            oPassword: "",
            nPassword: "",
            cPassword: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.display === true) {
            let modal = document.getElementById("change-password-modal");
            modal.style.display = "block";
        }
    }
    closePasswordModal() {
        let modal = document.getElementById("change-password-modal");
        modal.style.display = "none";
    }
    
    changePassword() {
        console.log("Password changed");
    }
    
    handleOldPasswordChange(e: any) {
        this.setState({
            oPassword: e.target.value
        });
    }
    handleNewPasswordChange(e: any) {
        this.setState({
            nPassword: e.target.value
        });
    }
    handleConfirmPasswordChange(e: any) {
        this.setState({
            cPassword: e.target.value
        });
    }
    render() {
        return (
        <div className="modal" id="change-password-modal">
            <div className="accent-colour-modal-content">
                <div className="modal-header">
                    <span className="close" onClick={this.closePasswordModal.bind(this)}>x</span>
                    <h2>Choose Your Colours</h2>
                </div>
                <div className="modal-body">
                    <div className="modal-container">
                    <h3>Current Password</h3>
                    <input type="password" name="oPassword" onChange={this.handleOldPasswordChange.bind(this)}/>
                    <h3>New Password</h3>
                    <input type="password" name="nPassword" onChange={this.handleNewPasswordChange.bind(this)}/>
                    <h3>Confirm New Password</h3>
                    <input type="password" name="cPassword" onChange={this.handleConfirmPasswordChange.bind(this)}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <h2 className="footer-button" onClick={this.changePassword.bind(this)}>Change Password</h2>
                </div>
            </div>
        </div>
        );
    }
    
}

export default ChangePasswordModal;