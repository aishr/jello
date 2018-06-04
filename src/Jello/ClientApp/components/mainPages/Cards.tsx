import * as React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import * as $ from 'jquery';

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

const columnNames = ['A', 'B', 'C', 'D', 'E'];

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
                children: generateItems(5, (i) => ({
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
                        data: "Aishwarya"
                    }))
                }))
            },
            display: false
        };
    }

    /*componentWillMount() {
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".smooth-dnd-container.horizontal .smooth-dnd-draggable-wrapper { display: inline-block; }";
        document.body.appendChild(css); 
    }*/

    componentDidMount() {
        var body = document.body;
        var burgerMenu = document.getElementsByClassName('b-menu')[0];
        var burgerContain = document.getElementsByClassName('b-container')[0];
        var burgerNav = document.getElementsByClassName('b-nav')[0];

        burgerMenu.addEventListener('click', function toggleClasses() {
            [body, burgerContain, burgerNav].forEach(function (el) {
                el.classList.toggle('open');
            });
        }, false);

        this.getAccentColour(); 
    }

    isLoggedIn() {
        $.ajax({
            url: '/Account/GetCurrentUser',
            type: 'GET',
            success: () => {
                this.setState({
                    display: true
                });
            },
            error: () => {
                window.location.replace("/");
            }
        });
    }

    getAccentColour() {
        $.ajax({
            url: '/Account/GetAccentColour',
            type: 'GET',
            success: (responseData) => {
                document.documentElement.style.setProperty('--accent-colour', responseData.accentColour);
                document.documentElement.style.setProperty('--text-colour', responseData.textColour);
                this.isLoggedIn();
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.display &&
                    <div className="card-scene">
                        <Container orientation="horizontal" onDrop={this.onColumnDrop} nonDragAreaSelector=".smooth-dnd-draggable-wrapper">
                            {this.state.scene.children.map((column) => {
                                return (
                                    <Draggable key={column.id}>
                                        <div className={column.props.className}>
                                            <div className="card-column-header">
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
                }
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