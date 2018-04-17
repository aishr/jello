import * as React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';


class SimpleSortableList extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container onDrop={this.props.onDrop}>
                    {this.props.items.map(item => {
                        return (
                            <Draggable key={item.id}>
                                {this.props.renderItem(item)}
                            </Draggable>
                        );
                    })}
                </Container>
            </div>
        );
    }
}

export default SimpleSortableList;