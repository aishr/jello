import * as React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(creator(i));
    }
    return result;
};

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
};

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const columnNames = ['Lorem', 'Ipsum', 'Consectetur', 'Eiusmod'];

class Cards extends React.Component<any, any> {
    constructor() {
        super();

        this.onColumnDrop = this.onColumnDrop.bind(this);
        this.onCardDrop = this.onCardDrop.bind(this);
        this.getCardPayload = this.getCardPayload.bind(this);
        this.state = {
            scene: {
                type: 'container',
                props: {
                    orientation: 'horizontal'
                },
                children: generateItems(4, (i) => ({
                    id: `column${i}`,
                    type: 'container',
                    name: columnNames[i],
                    props: {
                        orientation: 'vertical',
                        className: 'card-container'
                    },
                    children: generateItems(5, (j) => ({
                        type: 'draggable',
                        id: `${i}${j}`,
                        props: {
                            className: 'card',
                            style: { backgroundColor: 'white' }
                        },
                        data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
                    }))
                }))
            }
        };
    }


    render() {
        return (
            <div className="card-scene">
                <Container orientation="horizontal" onDrop={this.onColumnDrop} dragHandleSelector=".column-drag-handle">
                    {this.state.scene.children.map((column) => {
                        return (
                            <Draggable key={column.id}>
                                <div className={column.props.className}>
                                    <div className="card-column-header">
                                        <span className="column-drag-handle">&#x2630;</span>
                                        {column.name}
                                    </div>
                                    <Container {...column.props} groupName="col"
                                        onDrop={e => this.onCardDrop(column.id, e)}
                                        getChildPayload={index => this.getCardPayload(column.id, index)}
                                        dragClass="card-ghost"
                                        dropClass="card-ghost-drop"
                                        onDragEnter={() => { console.log('drag enter:', column.id); }}
                                        onDragLeave={() => { console.log('drag leave:', column.id); }}
                                    >
                                        {column.children.map(card => {
                                            return (
                                                <Draggable key={card.id}>
                                                    <div {...card.props}>
                                                        <p>
                                                            {card.data}
                                                        </p>
                                                    </div>
                                                </Draggable>
                                            );
                                        })}
                                    </Container>
                                </div>
                            </Draggable>
                        );
                    })}
                </Container>
            </div>
        );
    }

    getCardPayload(columnId, index) {
        return this.state.scene.children.filter(p => p.id === columnId)[0].children[index];
    }

    onColumnDrop(dropResult) {
        const scene = Object.assign({}, this.state.scene);
        scene.children = applyDrag(scene.children, dropResult);
        this.setState({
            scene
        });
    }

    onCardDrop(columnId, dropResult) {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const scene = Object.assign({}, this.state.scene);
            const column = scene.children.filter(p => p.id === columnId)[0];
            const columnIndex = scene.children.indexOf(column);

            const newColumn = Object.assign({}, column);
            newColumn.children = applyDrag(newColumn.children, dropResult);
            scene.children.splice(columnIndex, 1, newColumn);

            this.setState({
                scene
            });
        }
    }
}

export default Cards;