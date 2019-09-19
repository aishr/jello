import * as React from 'react';
import DeleteBoardModal from './DeleteBoardModal';

class BoardIcon extends React.Component<any, any> {
    constructor() {
        super();
    }

    openDeleteModal() {
        let modal = document.getElementById('delete-board-modal');
        modal.style.display = "block";
    }

    render() {
        return (
            <div>
                <DeleteBoardModal name={this.props.name} id={this.props.id}/>
                <div className="board-icon">
                    <div className="board-icon-header">
                        <span className="close" onClick={this.openDeleteModal.bind(this)}>×</span>
                    </div>
                    <div className="board-icon-content">{this.props.name}</div>
                </div>
            </div>
        );
    }
}

export default BoardIcon;