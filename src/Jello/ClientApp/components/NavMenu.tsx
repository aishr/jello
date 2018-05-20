import * as React from 'react';
import * as $ from 'jquery';

class NavMenu extends React.Component<any, any> {
    logout() {
        $.ajax({
            url: '/Account/Logout',
            type: 'POST',
            success: () => {
                window.location.replace("/");
            },
            error: () => {
                alert("An error has occured, please try logging out again");
                return;
            }
        });
    }
    render() {
        return (
            <div>
                <div className="b-nav">
                    <li><a className="b-link" href="/home">Home</a></li>
                    <li><a className="b-link" onClick={this.logout.bind(this)}>Logout</a></li>
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

