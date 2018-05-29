import * as React from 'react';
import AccentColourIcon from './AccentColourIcon';

class AccentColourModal extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            colours: {
                "maroon":"white",
                "red":"black",
                "orange":"black",
                "yellow":"black",
                "olive":"black",
                "green":"black",
                "purple":"black",
                "fuchsia":"black",
                "lime":"black",
                "teal":"black",
                "aqua":"black",
                "blue":"black",
                "navy":"black",
                "black":"black",
                "gray":"black",
                "silver":"black"
            }
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
        const { colours } = this.state;
        console.log(colours);
        return (
            <div className="modal" id="accent-colour-modal">
                <div className="accent-colour-modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.closeColourModal.bind(this)}>x</span>
                        <h2>Choose An Accent Colour</h2>
                    </div>
                    <div className="modal-body">
                        {Object.keys(colours).map((key) => (
                            <AccentColourIcon colour={key} text={colours[key]} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default AccentColourModal;