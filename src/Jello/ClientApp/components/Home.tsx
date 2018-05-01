import * as React from 'react';
import * as $ from 'jquery';
import BoardIcon from './BoardIcon';

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
        this.getBoards();
    }

    getBoards() {
        $.ajax({
            url: '/Board/GetUserBoards',
            type: 'GET',
            success: (responseData) => {
                this.setState({
                    myBoards: responseData.user,
                    sharedBoards: responseData.shared,
                    display: true
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
                    <div className="board-container">
                        {this.state.myBoards.map(function (name: string, key: number) {
                            return (
                                <BoardIcon
                                    name={name}
                                />
                            );
                        })}
                    </div>}
                {this.state.display &&
                    <div className="board-container">
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