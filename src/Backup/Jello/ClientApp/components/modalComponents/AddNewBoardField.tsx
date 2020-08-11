import * as React from 'react';

class AddNewBoardField extends React.Component<any,any> {
    constructor(props) {
        super(props);
    }
    
    getFormContents() {

        if (this.props.fieldType == "text") {
            return (
                <input type={this.props.fieldType} name={this.props.tag}/>
            );
        }
        else if (this.props.fieldType == "radio") {
            return (
                <div>
                {this.props.options.map((item, key) => (
                    <label key={key} className='radio-button-container'>{item} 
                    <input type={this.props.fieldType} name={this.props.tag}/>
                    <span className='radio-button' />
                    </label>
                ))}
                </div>
            );
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