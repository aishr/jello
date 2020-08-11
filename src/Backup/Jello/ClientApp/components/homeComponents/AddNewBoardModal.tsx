import * as React from 'react';
import * as $ from 'jquery';
import AddNewBoardField from "../modalComponents/AddNewBoardField";

class AddNewBoard extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            specSet: [
                {
                    question: "Board Name",
                    fieldType: "text",
                    tag: "board-name",
                    options: []
                },
                {
                    question: "Orientation of Board",
                    fieldType: "radio",
                    tag: "orientation",
                    options: [
                        "Vertical",
                        "Horizontal"
                    ]
                    
                },
                {
                    question: "Number of Columns/Rows",
                    fieldType: "text",
                    tag: "column-number",
                    options: []
                }
            ]
        }
    }

    componentDidMount() { 
        let modal = document.getElementById('new-board-modal');
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
        let modal = document.getElementById('new-board-modal');
        modal.style.display = "block";
    }

    closeAddNewBoardModal() {
        let modal = document.getElementById('new-board-modal');
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
                            {this.state.specSet.map((item, key) => (
                                <AddNewBoardField
                                    key={key}
                                    question={item.question}
                                    fieldType={item.fieldType}
                                    tag={item.tag}
                                    options={item.options}
                                />
                                ))}
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