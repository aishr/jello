import * as React from 'react';
import * as $ from 'jquery';

class ErrorPage extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        $('.nav-container').remove();
    }

    goBack() {
        window.history.back();
    }

    render() {
        return (
            <div>
                <div className="message-box">
                    <h1>404</h1>
                    <p>Oops! Looks like you dropped some jello</p>
                    <div className="buttons-con">
                        <div className="action-link-wrap">
                            <a onClick={this.goBack.bind(this)} className="link-button">Go Back</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorPage;