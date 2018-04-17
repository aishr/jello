import * as React from 'react';
import * as $ from 'jquery';

class Login extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            allowed: true
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

    addLoginError(type: string) {
        $('.error-message').remove();
        var message = "";
        if (type === 'username') {
            message = "Please enter a username"
        }
        if (type === 'password') {
            message = "Please enter a password";
        }
        if (type === 'login') {
            message = "The username or password is incorrect/invalid"
        }
        var errorMessage = '<p class="error-message">' + message + '</p>';
        $('.button').after(errorMessage);
    }

    handleUsernameChange(e: any) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e: any) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
                {this.state.allowed && <div className="form">
                    <form className="login-form" id="login-form">
                        <input type="text" placeholder="username" onChange={this.handleUsernameChange.bind(this)} />
                        <input type="password" placeholder="password" onChange={this.handlePasswordChange.bind(this)} />
                        <div onClick={this.addLoginError.bind(this)} className="button">login</div>
                        <p>New User? Click Here To Register</p>
                    </form>
                </div>}
            </div>
        );
    }
}

export default Login;