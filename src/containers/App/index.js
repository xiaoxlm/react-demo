import React from 'react';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ErrorToast from '../../components/ErrorToast/index'
import { actions as appActions ,getError } from '../../redux/modules/app'
import AsyncComponent from "../../utils/AsyncComponent";
import PrivateRoute from "../PrivateRoute"

const Home = AsyncComponent(() => import("../Home"));
const ProductDetail = AsyncComponent(() => import("../ProductDetail"));
const Search = AsyncComponent(() => import("../Search"));
const SearchResult = AsyncComponent(() => import("../SearchResult"));
const Login = AsyncComponent(() => import("../Login"));
const User = AsyncComponent(() => import("../User"));
const Purchase = AsyncComponent(() => import("../Purchase"));

class App extends React.Component {
    render() {
        const { error, appActions: { clearError }} = this.props
        return (
            <div className="App">
                <Router basename="/dianping">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/user" component={User} />
                        <Route path="/detail/:id" component={ProductDetail} />
                        <Route path="/search" component={Search} />
                        <Route path="/search_result" component={SearchResult} />
                        <PrivateRoute path="/purchase/:id" component={Purchase} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
                {  error ? <ErrorToast msg={error} clearError={clearError}/> : null}
            </div>
        );
    }
}

// state是redux的总state，props是当前容器型组件接收到的props
const mapStateToProps = (state, props) => {
    return {
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // 使用bindActionCreators后可以直接在组件当中发送action，而不需要调用dispatch来发送action
        // 因为直接从redux当中的app模块中的actionCreators拿了过来
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);