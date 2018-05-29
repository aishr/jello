import * as React from 'react';
import * as $ from 'jquery'

class AccentColourIcon extends React.Component<any, any> {
    constructor() {
        super();
        console.log(this.props);
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
                document.documentElement.style.setProperty('--accent-colour', this.props.colour);
                document.documentElement.style.setProperty('--text-colour', this.props.text); 
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

export default AccentColourIcon;