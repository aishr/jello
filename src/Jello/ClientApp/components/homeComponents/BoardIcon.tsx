import * as React from 'react';
import * as $ from 'jquery';

class BoardIcon extends React.Component<any, any> {
    constructor() {
        super();
    }

    deleteBoard() {
        const requestData = JSON.stringify({
            "Id": this.props.id
        });

        $.ajax({
            url: '/Home/DeleteBoard',
            type: 'DELETE',
            data: requestData,
            contentType: 'application/json',
            success: (responseData) => {
                location.reload();
            }
        });
    }

    render() {
        return (
            <div className="board-icon">
                <div className="board-icon-header">
                    <span className="close">×</span>
                </div>
                <div className="board-icon-content">{this.props.name}</div>
            </div>
        );
    }
}

export default BoardIcon;