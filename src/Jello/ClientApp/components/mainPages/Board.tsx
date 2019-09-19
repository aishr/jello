import * as React from 'react';
import * as $ from 'jquery';

class Board extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            display: false
        };
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
            }
        });
    }

    getBoardInfo() {
        $.ajax({
            url: '/Board/GetBoardInfo',
            type: 'GET',
            success: (responseData) => {
                document.documentElement.style.setProperty('--accent-colour', responseData.accentColour);
                document.documentElement.style.setProperty('--text-colour', responseData.textColour);
                this.isLoggedIn();
            }
        });
    }

    render() {
        return (
            <div>
                <h1>This is a board {this.props.match.params.boardId}</h1>
            </div>
        );
    }
}

export default Board;