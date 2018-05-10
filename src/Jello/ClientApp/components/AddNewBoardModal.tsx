import * as React from 'react';
import * as $ from 'jquery';

class AddNewBoard extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() { 
        var modal = document.getElementById('myModal');
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    addBoard() {
        const requestData = JSON.stringify({
            Name: "a"
        });
        $.ajax({
            url: '/Home/AddUserBoard',
            type: 'POST',
            data: requestData,
            contentType: 'application/json',
            success: (responseData) => {
                this.setState({
                    myBoards: responseData.user,
                    sharedBoards: responseData.shared
                });

                console.log(this.state);
            },
            error: () => {
                console.log("There was an error retrieving your boards");
                return;
            }
        });
    }

    openAddNewBoardModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    }

    closeAddNewBoardModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }

    render() {
        return (
            <div>
                <button className="new-board-button" onClick={this.openAddNewBoardModal.bind(this)}>+ Add New Board</button>
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={this.closeAddNewBoardModal.bind(this)}>×</span>
                            <h2>Add New Board</h2>
                        </div>
                        <div className="modal-body">
                            <form className="new-board-form">

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewBoard;