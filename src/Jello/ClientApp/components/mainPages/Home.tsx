import * as React from 'react';
import * as $ from 'jquery';
import BoardIcon from './../homeComponents/BoardIcon';
import AddNewBoard from './../homeComponents/AddNewBoardModal';
import CustomColourModal from './../homeComponents/CustomColourModal';

class Home extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            myBoards: [],
            sharedBoards: [],
            display: false,
            chooseColour: false
        }
        this.isLoggedIn = this.isLoggedIn.bind(this);
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

        this.getBoards();
    }

    isLoggedIn() {
        $.ajax({
            url: '/Account/GetCurrentUser',
            type: 'GET',
            success: () => {
                this.setState({
                    display: true
                });
                this.getAccentColour();
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
            },
            error: () => {
                this.setState({
                    chooseColour: true
                });
            }
        });
    }

    getBoards() {
        $.ajax({
            url: '/Home/GetUserBoards',
            type: 'GET',
            success: (responseData) => {
                if (responseData == null) {
                    this.isLoggedIn();
                }
                this.setState({
                    myBoards: responseData.userBoards,
                    sharedBoards: responseData.sharedBoards
                });
                this.isLoggedIn();
            },
            error: () => {
                this.isLoggedIn();
                return;
            }
        });
    } 

    render() { 
        return (
            <div>
                <CustomColourModal display={this.state.chooseColour} />
                {this.state.display && <div>
                    <AddNewBoard />
                </div>}
                {this.state.display && <div className="board-container">
                    <h3>My Boards</h3>
                    {this.state.myBoards.map(function (item: any, key: number) {
                        return (
                            <BoardIcon
                                key={key}
                                name={item.name}
                                id={item.id}
                            />
                        );
                    })}
                </div>}
                {this.state.display && <div className="board-container">
                    <h3>Shared</h3>
                    {this.state.sharedBoards.map(function (item: any, key: number) {
                        return (
                            <BoardIcon
                                key={key}
                                name={item.name}
                            />
                        );
                    })}
                </div>}
            </div>
        );
    }
}

export default Home;