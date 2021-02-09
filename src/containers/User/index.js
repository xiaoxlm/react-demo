import React, { Component } from 'react';
import UserMain from "./components/UserMain"
import UserHeader from "./components/UserHeader" // 1. 引入

class User extends Component {
    render() {
        return (
            <div>
                <UserHeader onBack={this.handleBack} onLogout={this.handleLogout}/>
                <UserMain/>
            </div>
        );
    }

    handleBack = () => {
        // todo
    }

    handleLogout = () => {
        // todo
    }
}

export default User;