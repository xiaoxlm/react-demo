import React from 'react';
import ErrorToast from '../../components/ErrorToast/index'
import { connect } from 'react-redux'
import { actions as appActions ,getError } from '../../redux/modules/app'
// import './style.css';
import { bindActionCreators } from 'redux';
import Home from '../Home'

class App extends React.Component {
    render() {
        const { error, appActions: { clearError }} = this.props
        return (
            <div className="App">
                <Home />
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