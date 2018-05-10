import * as React from 'react';
import * as $ from 'jquery';
import BoardIcon from './BoardIcon';
import AddNewBoard from './AddNewBoardModal';

class Home extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            myBoards: [],
            sharedBoards: [],
            display: false
        }
    }

    componentDidMount() {
        this.isLoggedIn();

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

    getBoards() {
        $.ajax({
            url: '/Home/GetUserBoards',
            type: 'GET',
            success: (responseData) => {
                this.setState({
                    myBoards: responseData.userCreatedBoards,
                    sharedBoards: responseData.sharedBoards
                });

                console.log(this.state);
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
                {this.state.display &&
                    <div>
                        <AddNewBoard />
                    </div>
                }
                {this.state.display &&
                    <div className="board-container">
                        <h3>My Boards</h3>
                        {this.state.myBoards.map(function (name: string, key: number) {
                            return (
                                <BoardIcon
                                    name={name}
                                />
                            );
                        })}
                    </div>
                }
                {this.state.display &&
                    <div className="board-container">
                        <h3>Shared</h3>
                        {this.state.sharedBoards.map(function (name: string, key: number) {
                            return (
                                <BoardIcon
                                    name={name}
                                />
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default Home;