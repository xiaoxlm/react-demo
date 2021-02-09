import React, { Component } from 'react';
import UserMain from "./containers/UserMain"
import UserHeader from "./components/UserHeader" // 1. 引入
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { actions as userActions, getOrders, getCurrentTab} from "../../redux/modules/user"
import { actions as loginActions } from "../../redux/modules/login"

class User extends Component {
    render() {
        const {orders} = this.props
        return (
            <div>
                <UserHeader onBack={this.handleBack} onLogout={this.handleLogout}/>
                <UserMain data={orders}/>
            </div>
        );
    }

    componentDidMount() {
        this.props.userActions.loadOrders()
    }

    handleBack = () => { // 返回
        this.props.history.push("/")
    }

    handleLogout = () => { // 注销
        this.props.loginActions.logout();
    }

    handleSetCurrentTab = (index) => {
        this.props.userActions.setCurrentTab(index)
    }
}

const mapStateToProps = (state, props) => {
    return {
        orders: getOrders(state),
        currentTab: getCurrentTab(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch), // 使用redux的user模块的action
        loginActions: bindActionCreators(loginActions, dispatch) // 使用redux的login模块的action
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);