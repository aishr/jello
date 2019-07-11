import * as React from 'react';

class AddNewBoardField extends React.Component<any,any> {
    constructor(props) {
        super(props);
    }
    
    getFormContents() {

        if (this.props.fieldType == "text") {
            return `<input type=${this.props.fieldType} name=${this.props.tag}/>`;
        }
        else if (this.props.fieldType == "radio") {
            var code = ``;
            for (var i = 0; i < this.props.options.length; i++) {
                code +=`<label className='radio-button-container'> ${item.options[i]} <input type=${item.fieldType} name= ${item.tag}/><span className='radio-button' /></label>`;
            }
            return code;
        }
    }
    
    render() {
        return (
            <form className="new-board-form">
                <h4>{this.props.question}</h4>
                {this.getFormContents()}
            </form>
        );
    }
}

export default AddNewBoardField;