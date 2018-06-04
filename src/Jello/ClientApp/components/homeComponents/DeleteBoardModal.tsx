import * as React from 'react';
import * as $ from 'jquery';

class DeleteBoardModal extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            boardName: ""
        };
    }

    deleteBoard() {
        $('.error-message').remove();
        if (this.state.boardName !== this.props.name) {
            var errorMessage = '<p class="error-message">Invalid Name</p>';
            $('.custom-colour-input').after(errorMessage);
            return;
        }
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
            },
            error: () => {
                alert("There was an error in deleting your board. Please try again");
            }
        });
    }

    handleBoardNameChange(e: any) {
        this.setState({
            boardName: e.target.value
        });
    }

    render() {
        return (
            <div className="modal" id="delete-board-modal">
                <div className="accent-colour-modal-content">
                    <div className="modal-header">
                        <h3>Delete Board</h3>
                    </div>
                    <div className="modal-body">
                        <p>Enter the name of your board ({this.props.name}) to delete it</p>
                        <input type="text" className="custom-colour-input" onChange={this.handleBoardNameChange.bind(this)} />
                    </div>
                    <div className="modal-footer">
                        <h2 className="footer-button" onClick={this.deleteBoard.bind(this)}>Delete Board</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteBoardModal;