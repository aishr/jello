import * as React from 'react';
import * as $ from 'jquery';

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
        $('.error-message').remove();
        $('.success-message').remove();
        if (this.state.oPassword === "") {
            this.addError("password1");
            return;
        }
        if (this.state.nPassword === "") {
            this.addError("password2");
            return;
        }
        if (this.state.cPassword === "") {
            this.addError("password3");
            return;
        }        
        if (this.state.nPassword !== this.state.cPassword){
            this.addError("password4");
            return;
        }
        
        const requestData = JSON.stringify({
            "OldPassword": this.state.oPassword,
            "NewPassword": this.state.nPassword,
            "ConfirmPassword": this.state.cPassword
        });

        $.ajax({
            url: '/Account/ChangePassword',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: () => {
                this.addSuccess("redirect");
            },
            error: (errorData) => {
                this.addError(JSON.parse(errorData.responseText).errors[0].description);
            }
        });
    }
    
    addError(type: string) {
        let message = "";
        if (type === 'password1') {
            message = "Please enter your current password";
        }
        else if (type === 'password2') {
            message = "Please enter a new password";
        }
        else if (type === 'password3') {
            message = "Please confirm your new password";
        }
        else if (type === 'password4') {
            message = "Passwords do not match"
        }
        else {
            message = type;
        }
        let errorMessage = '<p class="error-message">' + message + '</p>';
        $('.modal-container').after(errorMessage);
    }

    addSuccess(type: string) {
        let message = "";
        if (type === 'redirect') {
            message = "Password was changed successfully"
        }
        let successMessage = '<p class="success-message">' + message + '</p>';
        $('#password-modal-container').after(successMessage);
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
                    <div className="modal-container" id="password-modal-container">
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