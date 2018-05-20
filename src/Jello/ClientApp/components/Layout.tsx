import * as React from 'react';
import NavMenu from './NavMenu';
import * as $ from 'jquery';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='nav-container'>
                        <NavMenu />
                    </div>
                    <div className='site-main-body'>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}