import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Category from "./components/Category";
import Headline from "./components/Headline";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList";

import {
    actions as homeActions,
    getLikes,
    getDiscounts,
    getPageCountOfLikes
} from '../../redux/modules/home'

class Home extends Component {
    render() {
        const { likes, discounts, pageCount } = this.props
        return (
            <div>
                <Category />
                <Headline />
                <Discount data={discounts}/>
                <LikeList
                    data={likes}
                    pageCount={pageCount}
                    fetchData={this.fetchMoreLikes}
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.homeActions.loadDiscounts()
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}

const mapStateToProps = (state, props) => {
    return {
        likes: getLikes(state),
        discounts: getDiscounts(state),
        pageCount: getPageCountOfLikes(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);