import * as React from 'react';
import * as $ from 'jquery';

class Register extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            cPassword: "",
            username: "",
        }
    }

    componentDidMount() {
        var body = document.body;
        var burgerMenu = document.getElementsByClassName('b-menu')[0];
        var burgerContain = document.getElementsByClassName('b-container')[0];
        var burgerNav = document.getElementsByClassName('b-nav')[0];

        burgerMenu.addEventListener('click', function toggleClasses() {
            [body, burgerContain, burgerNav].forEach(function (el) {
                el.classList.toggle('open');
            });
        }, false);
    }

    validateEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    addError(type: string) {
        var message = "";
        if (type === 'email1') {
            message = "Please enter a email";
        }
        else if (type === 'email2') {
            message = "Please enter a valid email";
        }
        else if (type === 'password1') {
            message = "Please enter a password";
        }
        else if (type === 'login') {
            message = "The username or password is incorrect/invalid";
        }
        else if (type === 'password2') {
            message = "Please confirm your password";
        }
        else if (type === 'password3') {
            message = "Passwords do not match";
        }
        else if (type === 'register') {
            message = "There is already an account with this email";
        }
        var errorMessage = '<p class="error-message">' + message + '</p>';
        $('.button').after(errorMessage);
    }

    addSuccess(type: string) {
        var message = ""
        if (type === 'redirect') {
            message = "Registration was successful\nRedirecting in 5 seconds"
        }
        var successMessage = '<p class="success-message">' + message + '</p>';
        $('.button').after(successMessage);
    }

    register() {
        $('.error-message').remove();
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
            "Username": this.state.username
        });

        $.ajax({
            url: '/Account/Register',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: () => {
                this.addSuccess('redirect');
                window.location.replace("/");
            },
            error: () => {
                this.addError('register');
                return;
            }
        });
    }

    handleEmailChange(e: any) {
        this.setState({
            email: e.target.value
        });
    }

    handleUsernameChange(e: any) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e: any) {
        this.setState({
            rPassword: e.target.value
        });
    }

    handleConfirmPasswordChange(e: any) {
        this.setState({
            cPassword: e.target.value
        });
    }

    render() {
        return (
            <div className="form">
                <form className="login-form" id="login-form">
                    <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
                    <input type="text" placeholder="username" onChange={this.handleUsernameChange.bind(this)} />
                    <input type="password" placeholder="password" onChange={this.handlePasswordChange.bind(this)} />
                    <input type="password" placeholder="confirm password" onChange={this.handleConfirmPasswordChange.bind(this)} />
                    <div onClick={this.register.bind(this)} className="button">register</div>
                </form>
            </div>
        );
    }
}

export default Register;