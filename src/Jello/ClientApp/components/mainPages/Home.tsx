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
                this.setState({
                    myBoards: responseData.userBoards,
                    sharedBoards: responseData.sharedBoards
                });
                this.getAccentColour();
            },
            error: () => {
                console.log("There was an error retrieving your boards");
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