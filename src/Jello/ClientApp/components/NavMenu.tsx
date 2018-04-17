import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <div className="b-nav">
                    <li><a className="b-link" href="/home">Home</a></li>
                    <li><a className="b-link" href="/about">About</a></li>
                </div>
                {/* Burger-Icon */}
                <div className="b-container">
                    <div className="b-menu">
                        <div className="b-bun b-bun--top" />
                        <div className="b-bun b-bun--mid" />
                        <div className="b-bun b-bun--bottom" />
                    </div>
                </div>
            </div> 
        );
    }
}

export default NavMenu;

