import * as React from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation, Alpha } from 'react-color/lib/components/common';

class ColourPicker extends React.Component {
    constructor() {
        super();
    }

    
    render() {
        return (
            <div>
                <div className="hue-container">
                    <Hue
                        {...this.props}
                        direction={'horizontal' || 'vertical'} /> 
                </div>
                <div className="sat-container">
                    <Saturation
                        {...this.props} />
                </div>
                <div className="hue-container">
                    <Alpha
                        {...this.props} />
                </div>
            </div>
        );
    }
}

export default CustomPicker(ColourPicker);