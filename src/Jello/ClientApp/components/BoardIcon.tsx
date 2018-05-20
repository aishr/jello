import * as React from 'react';

class BoardIcon extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="board-icon">{this.props.name}</div>
        );
    }
}

export default BoardIcon;