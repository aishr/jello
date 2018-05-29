import * as React from 'react';
import * as $ from 'jquery';

class Settings extends React.Component<any, any> {
    constructor() {
        super();
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

        this.getAccentColour();

        this.isLoggedIn();
    }

    isLoggedIn() {
        $.ajax({
            url: '/Account/GetCurrentUser',
            type: 'GET',
            success: () => {
                this.setState({
                    display: true
                });
            },
            error: () => {
                window.location.replace("/");
            }
        });
    } 

    getAccentColour() {
        $.ajax({
            url: '/Account/GetAccentColour',
            type: 'GET',
            success: (responseData) => {
                document.documentElement.style.setProperty('--accent-colour', responseData);
                console.log(document.documentElement.style.getPropertyValue("--accent-colour"));
            },
            error: () => {
                this.setState({
                    chooseColour: true
                });
            }
        });
    }

    render() {
        return (
            <div className="board-icon">{this.props.name}</div>
        );
    }
}

export default Settings;