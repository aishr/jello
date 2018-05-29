import * as React from 'react';
import ColourIcon from './ColourIcon';

class AccentColourModal extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            accentColours: [
                "maroon",
                "red",
                "orange",
                "yellow",
                "olive",
                "green",
                "purple",
                "fuchsia",
                "lime",
                "teal",
                "aqua",
                "blue",
                "navy",
                "black",
                "gray",
                "silver"
            ],
            textColours: [
                "black",
                "white"
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.display === true) {
            var modal = document.getElementById("accent-colour-modal");
            modal.style.display = "block";
        }
    }

    closeColourModal() {
        var modal = document.getElementById("accent-colour-modal");
        modal.style.display = "none";
    }

    render() {
        return (
            <div className="modal" id="accent-colour-modal">
                <div className="accent-colour-modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.closeColourModal.bind(this)}>x</span>
                        <h2>Choose Your Colours</h2>
                    </div>
                    <div className="modal-body">
                        {this.state.accentColours.map(function (item, key) {
                            return (
                                <ColourIcon colour={item} variable="--accent-colour" />
                            );
                        })}
                        {this.state.textColours.map(function (item, key) {
                            return (
                                <ColourIcon colour={item} variable="--text-colour" />
                            );
                        })} 
                    </div>
                </div>
            </div>
        );
    }
}

export default AccentColourModal;