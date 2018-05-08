import * as React from 'react';
import * as $ from 'jquery';

class Login extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            username: "",
            rememberMe: false
        }
    }

    componentWillMount() {
        document.addEventListener("keypress", this.handleEnterKeyPress.bind(this));
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
        if (this.state.password == "") {
            this.addError('password1');
            return;
        }
        const requestData = JSON.stringify({
            Email: this.state.email,
            Password: this.state.password,
            IsPersistent: this.state.rememberMe
        });

        $.ajax({
            url: '/Account/Login',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: () => {
                window.location.replace("/home");
            },
            error: (errorData) => {
                if (errorData.status == 423) {
                    this.addError('lockout');
                    return;
                }
                this.addError('login');
                return;
            }
        });
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
        var errorMessage = '<p class="error-message">' + message + '</p>';
        $('.button').after(errorMessage);
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

    handleUsernameChange(e: any) {
        this.setState({
            username: e.target.value
        });
    }

    handleRememberMe(e: any) {
        this.setState({
            rememberMe: !this.state.rememberMe
        });
    }

    handleEnterKeyPress(e: any) {
        console.log("keypress");
        if (e.charCode == 13 || e.keyCode == 13) {
            this.login();
        }
    }

    render() {
        return (
            <div className="form">
                <form className="login-form" id="login-form">
                    <input type="text" placeholder="email" onChange={this.handleEmailChange.bind(this)} />
                    <input type="password" placeholder="password" onChange={this.handlePasswordChange.bind(this)} />
                    <label onChange={this.handleRememberMe.bind(this)} className="container">Remember Me<input type="checkbox" /><span className="checkmark"></span></label>
                    <div onClick={this.login.bind(this)} className="button">login</div>
                    <a href="/register">New User? Click Here To Register</a>
                </form>
            </div>
        );
    }
}

export default Login;