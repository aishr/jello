import * as React from 'react';
import * as $ from 'jquery';
import CustomColourModal from './../homeComponents/CustomColourModal'

class Settings extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            chooseColour: false,
            display: false
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
            chooseColour: true
        });
    }

    render() {
        return (
            <div>
                <CustomColourModal display={this.state.chooseColour} />
                {this.state.display &&
                    <div className="colour-preview-button" onClick={this.showCustomColourModal.bind(this)}>Change Custom Colours</div>
                }
            </div>
        );
    }
}

export default Settings;