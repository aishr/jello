import * as React from 'react';
import * as $ from 'jquery';

class Board extends React.Component<any, any> {
    constructor() {
        super();
    }

    getBoardInfo() {

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