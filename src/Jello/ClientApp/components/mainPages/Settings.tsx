import * as React from 'react';
import * as $ from 'jquery';
import CustomColourModal from './../homeComponents/CustomColourModal';
import ChangePasswordModal from "../settingsComponents/ChangePasswordModal";

class Settings extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            chooseColour: false,
            changePassword: false,
            display: false
        }
    }

    componentDidMount() {
        let body = document.body;
        let burgerMenu = document.getElementsByClassName('b-menu')[0];
        let burgerContain = document.getElementsByClassName('b-container')[0];
        let burgerNav = document.getElementsByClassName('b-nav')[0];

        burgerMenu.addEventListener('click', function toggleClasses() {
            [body, burgerContain, burgerNav].forEach(function (el) {
                el.classList.toggle('open');
            });
        }, false);

        this.getAccentColour(); 
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
                document.documentElement.style.setProperty('--accent-colour', responseData.accentColour);
                document.documentElement.style.setProperty('--text-colour', responseData.textColour);
                this.isLoggedIn();
            },
            error: () => {
                this.isLoggedIn();
            }

        });
    }

    showCustomColourModal() {
        this.setState({
            chooseColour: true,
            changePassword: false
        });
    }
    
    showChangePasswordModal() {
        this.setState({
            changePassword: true,
            chooseColour: false
        });
    }

    render() {
        return (
            <div>
                <CustomColourModal display={this.state.chooseColour} />
                <ChangePasswordModal display={this.state.changePassword} />
                {this.state.display &&
                    <div className="colour-preview-button" onClick={this.showCustomColourModal.bind(this)}>Change Custom Colours</div>
                }
                {this.state.display &&
                    <div className="colour-preview-button" onClick={this.showChangePasswordModal.bind(this)}>Change Password</div>
                }
            </div>
        );
    }
}

export default Settings;