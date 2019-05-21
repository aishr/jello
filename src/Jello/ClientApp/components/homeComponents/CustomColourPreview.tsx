import * as React from 'react';

class CustomColourPreview extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="accent-colour-preview" style={{ backgroundColor: this.props.colour, color: this.props.text }}>Text</div>
        );
    }
}

export default CustomColourPreview;