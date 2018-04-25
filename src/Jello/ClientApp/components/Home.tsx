import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Draggable } from 'react-smooth-dnd';
import Cards from './Cards';
import BoardList from './BoardList';

class Home extends React.Component<any, any> {

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
    }

    render() {
        return (
            <div>
                <BoardList />
            </div>
        );
    }
}

export default Home;