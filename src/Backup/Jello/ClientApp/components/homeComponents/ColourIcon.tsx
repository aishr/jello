import * as React from 'react';

class ColourIcon extends React.Component<any, any> {
    constructor() {
        super();
    } 

    render() {
        return (
            <div className="colour-icon" style={{ backgroundColor: this.props.colour }} onClick={this.props.setColour.bind(this, this.props.colour)}>{this.props.colour}</div>
        );
    }
}

export default ColourIcon;