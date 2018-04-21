import * as React from 'react';
import * as $ from 'jquery';

class Login extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            email: "",
            lPassword: "",
            rPassword: "",
            cPassword: "",
            login: true,
            register: false
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

    login() {
        $('.error-message').remove();
        if (this.state.email == "") {
            this.addError('email1');
            return;
        }
        if (!this.validateEmail(this.state.email)) {
            this.addError('email2');
            return;
        }
        if (this.state.lPassword == "") {
            this.addError('password1');
            return;
        }
        return true;
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
        if (this.state.rPassword == "") {
            this.addError('password1');
            return;
        }
        if (this.state.cPassword == "") {
            this.addError('password2');
            return;
        }
        if (this.state.rPassword !== this.state.cPassword) {
            this.addError('password3');
            return;
        }
        location.reload();
        return true;
    }

    handleEmailChange(e: any) {
        this.setState({
            email: e.target.value
        });
    }

    handleLoginPasswordChange(e: any) {
        this.setState({
            lPassword: e.target.value
        });
    }

    handleRegisterPasswordChange(e: any) {
        this.setState({
            rPassword: e.target.value
        });
    }

    handleConfirmPasswordChange(e: any) {
        this.setState({
            cPassword: e.target.value
        });
    }

    openRegisterConsole() {
        this.setState({
            login: false,
            register: true
        });
    }

    openLoginConsole() {
        this.setState({
            login: true,
            register: false
        });
    }

    render() {
        return (
            <div>
                {this.state.login && <div className="form">
                    <form className="login-form" id="login-form">
                        <input type="text" placeholder="email" onChange={this.handleEmailChange.bind(this)} />
                        <input type="password" placeholder="password" onChange={this.handleLoginPasswordChange.bind(this)} />
                        <div onClick={this.login.bind(this)} className="button">login</div>
                        <p className="register-redirect" onClick={this.openRegisterConsole.bind(this)}>New User? Click Here To Register</p>
                    </form>
                </div>}
                {this.state.register && <div className="form">
                    <p className="login-redirect" onClick={this.openLoginConsole.bind(this)}>Back to Login</p>
                    <form className="login-form" id="login-form">
                        <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
                        <input type="password" placeholder="password" onChange={this.handleRegisterPasswordChange.bind(this)} />
                        <input type="password" placeholder="confirm password" onChange={this.handleConfirmPasswordChange.bind(this)} />
                        <div onClick={this.register.bind(this)}className="button">register</div>
                    </form>
                </div>}
            </div>
        );
    }
}

export default Login;