﻿import * as React from 'react';
import * as $ from 'jquery';

class AddNewBoard extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() { 
        var modal = document.getElementById('new-board-modal');
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

            },
            error: () => {
                console.log("There was an error retrieving your boards");
                return;
            }
        });
    }

    openAddNewBoardModal() {
        var modal = document.getElementById('new-board-modal');
        modal.style.display = "block";
    }

    closeAddNewBoardModal() {
        var modal = document.getElementById('new-board-modal');
        modal.style.display = "none";
    }

    render() {
        return (
            <div>
                <button className="new-board-button" onClick={this.openAddNewBoardModal.bind(this)}>+ Add New Board</button>
                <div id="new-board-modal" className="modal">
                    <div className="new-board-modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={this.closeAddNewBoardModal.bind(this)}>×</span>
                            <h2>Add New Board</h2>
                        </div>
                        <div className="modal-body">
                            <form className="new-board-form">
                                <h4>Board Name</h4>
                                <input type="text" name="board-name" />
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                      <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Do you want columns to be draggable?</h4>
                                <label className="radio-button-container">Yes
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">No
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                            <form className="new-board-form">
                                <h4>Orientation of the Columns</h4>
                                <label className="radio-button-container">Vertical
                                    <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                                <label className="radio-button-container">Horizontal
                                      <input type="radio" name="radio" />
                                    <span className="radio-button" />
                                </label>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <h2 className="footer-button">Create New Board</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewBoard;