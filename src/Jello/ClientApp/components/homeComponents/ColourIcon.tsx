import * as React from 'react';
import * as $ from 'jquery'

class ColourIcon extends React.Component<any, any> {
    constructor() {
        super();
    }

    setAccentColour() {
        const requestData = JSON.stringify({
            Colour: this.props.colour
        });
        $.ajax({
            url: '/Account/SetAccentColour',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: (responseData) => {
                document.documentElement.style.setProperty(this.props.variable, this.props.colour);
                var modal = document.getElementById("accent-colour-modal");
                modal.style.display = "none";
            },
            error: () => {
            }
        });
    }

    render() {
        return (
            <div className="colour-icon" onClick={this.setAccentColour.bind(this)} style={{ backgroundColor: this.props.colour }}></div>
        );
    }
}

export default ColourIcon;