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
        var nav = document.getElementById("navHamLine");
        if (nav) {
            nav.setAttribute("style", "visibility: hidden;");
        }
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
                        <div className="button">login</div>
                    </form>
                </div>}
            </div>
        );
    }
}

export default Login;