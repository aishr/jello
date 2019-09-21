import * as React from 'react';
import * as $ from 'jquery';

class Register extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            cPassword: "",
        }
    }

    componentWillMount() {
        document.addEventListener("keypress", this.handleEnterKeyPress.bind(this));
    }

    componentDidMount() {
        $('.nav-container').remove();
        this.isLoggedIn();
    }

    isLoggedIn() {
        $.ajax({
            url: '/Account/GetCurrentUser',
            type: 'GET',
            success: () => {
                window.location.replace("/home");
            },
            error: () => {
                this.setState({
                    display: true
                });
            }
        });
    }

    validateEmail(email: string) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    addError(type: string, errorMessage: string = "") {
        let message = "";
        if (type === 'email1') {
            message = "Please enter a email";
        }
        else if (type === 'email2') {
            message = "Please enter a valid email";
        }
        else if (type === 'password1') {
            message = "Please enter a password";
        }
        else if (type === 'password2') {
            message = "Please confirm your password";
        }
        else if (type === 'password3') {
            message = "Passwords do not match";
        }
        else {
            message = errorMessage;
        }
        errorMessage = '<p class="error-message">' + message + '</p>';
        $('.auth-button').after(errorMessage);
    }

    addSuccess(type: string) {
        let message = "";
        if (type === 'redirect') {
            message = "Registration was successful"
        }
        let successMessage = '<p class="success-message">' + message + '</p>';
        $('.auth-button').after(successMessage);
    }

    register() {
        $('.error-message').remove();
        $('.success-message').remove();
        if (this.state.email == "") {
            this.addError('email1');
            return;
        }
        if (!this.validateEmail(this.state.email)) {
            this.addError('email2');
            return;
        }
        if (this.state.password == "") {
            this.addError('password1');
            return;
        }
        if (this.state.cPassword == "") {
            this.addError('password2');
            return;
        }
        if (this.state.password !== this.state.cPassword) {
            this.addError('password3');
            return;
        }

        const requestData = JSON.stringify({
            "Email": this.state.email,
            "Password": this.state.password,
        });

        $.ajax({
            url: '/Account/Register',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: () => {
                this.addSuccess('redirect');

            },
            error: (responseData) => {
                this.addError('', responseData.responseText);
                return;
            }
        });
    }

    handleEmailChange(e: any) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e: any) {
        this.setState({
            password: e.target.value
        });
    }

    handleConfirmPasswordChange(e: any) {
        this.setState({
            cPassword: e.target.value
        });
    }

    handleEnterKeyPress(e: any) {
        console.log("keypress");
        if (e.charCode == 13 || e.keyCode == 13) {
            this.register();
        }
    }

    render() {
        return (
            <div className="auth-form-container">
                <form className="login-form" id="login-form">
                    <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
                    <input type="password" placeholder="password" onChange={this.handlePasswordChange.bind(this)} />
                    <input type="password" placeholder="confirm password" onChange={this.handleConfirmPasswordChange.bind(this)} />
                    <div onClick={this.register.bind(this)} className="auth-button">register</div>
                    <a href="/">Back to Login</a>
                </form>
            </div>
        );
    }
}

export default Register;