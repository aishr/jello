import * as React from 'react';
import ColourIcon from './ColourIcon';
import CustomColourPreview from './CustomColourPreview';
import * as $ from 'jquery';

class CustomColourModal extends React.Component<any, any> {
    constructor() {
        super();
        this.setAccentColour = this.setAccentColour.bind(this);
        this.setTextColour = this.setTextColour.bind(this);
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
            ],
            selectedAccentColour: "gray",
            selectedTextColour: "white",
            cyoAccentColour: "",
            cyoTextColour: ""
        };
    }

    componentDidMount() {
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

    setCustomColours() {
        const requestData = JSON.stringify({
            AccentColour: this.state.selectedAccentColour,
            TextColour: this.state.selectedTextColour
        });
        $.ajax({
            url: '/Account/SetCustomColours',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: (responseData) => {
                var modal = document.getElementById("accent-colour-modal");
                modal.style.display = "none";
                location.reload();
            },
            error: () => {
            }
        });
    }

    setAccentColour = (accent) => {
        this.setState({
            selectedAccentColour: accent,
        });
    }

    setTextColour = (text) => {
        this.setState({
            selectedTextColour: text
        });
    }

    handleAccentColourChange(e: any) {
        $('.error-message').remove();
        if (e.target.value != null && e.target.value != "" && /^#[0-9A-F]{6}$/i.test(e.target.value)) {
            this.setState({
                cyoAccentColour: e.target.value
            });
        }
        else {
            var errorMessage = '<p class="error-message">Enter a Valid Hex Code (#000000)</p>';
            $('#accent-button').after(errorMessage);
        }
    }

    handleTextColourChange(e: any) {
        $('.error-message').remove();
        if (e.target.value != null && e.target.value != "" && /^#[0-9A-F]{6}$/i.test(e.target.value)) {
            this.setState({
                cyoTextColour: e.target.value
            });
        }
        else {
            var errorMessage = '<p class="error-message">Enter a Valid Hex Code (#000000)</p>';
            $('#text-button').after(errorMessage);
        }
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
                        <h3>Accent Colour</h3>
                        {this.state.accentColours.map((item, key) => (
                            <ColourIcon colour={item} setColour={this.setAccentColour} />
                        ))}
                        <div>
                            <input type="text" placeholder="#000000" className="custom-colour-input" onChange={this.handleAccentColourChange.bind(this)} />
                            <div id="accent-button" onClick={this.setAccentColour.bind(this, this.state.cyoAccentColour)} className="colour-preview-button">Preview</div>
                        </div>
                        <h3>Text Colour</h3>
                        {this.state.textColours.map((item, key) => (
                            <ColourIcon colour={item} setColour={this.setTextColour} />
                        ))}
                        <div>
                            <input type="text" placeholder="#000000" className="custom-colour-input" onChange={this.handleTextColourChange.bind(this)} />
                            <div id="text-button" onClick={this.setTextColour.bind(this, this.state.cyoTextColour)} className="colour-preview-button">Preview</div>
                        </div>
                        <h3>Preview</h3>
                        <CustomColourPreview colour={this.state.selectedAccentColour} text={this.state.selectedTextColour} />
                    </div>
                    <div className="modal-footer">
                        <h2 className="footer-button" onClick={this.setCustomColours.bind(this)}>Set Colours</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomColourModal;