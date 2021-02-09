import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    actions as userActions,
    getCurrentTab,
    getDeletingOrderId,
    getCurrentOrderComment,
    getCurrentOrderStars,
    getCommentingOrderId
} from "../../../../redux/modules/user";
import OrderItem from "../../components/OrderItem";
import Confirm from "../../../../components/Confirm";
import "./style.css";

const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"];
const data = [
    {
        "id": "o-2",
        "statusText": "已消费",
        "orderPicUrl": "https://p1.meituan.net/deal/95e79382c20a78da3068c4207ab7a9b4329494.jpg.webp@700w_700h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20",
        "channel": "团购",
        "title": "华莱士：华莱士单人套餐",
        "text": ["1张 | 总价：￥11.99", "有效期至2018-09-17"],
        "type": 1
    },
    {
        "id": "o-3",
        "statusText": "待付款",
        "orderPicUrl": "https://p0.meituan.net/dpdeal/f7c12272529ee2fe5578bd226bbc207458318.jpg.webp@700w_700h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20",
        "channel": "团购",
        "title": "芳芳家常菜：代金券1张",
        "text": ["2张 | 总价：￥76.00", "有效期至2018-09-02"],
        "type": 2
    },
    {
        "id": "o-4",
        "statusText": "已消费",
        "orderPicUrl": "https://p0.meituan.net/deal/e4f7972d34b289a00ae2491c70359024128785.jpg.webp@700w_700h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20",
        "channel": "团购",
        "title": "正新鸡排：【到店吃】正新椒皇炸鸡半只",
        "text": ["1张 | 总价：￥12.90", "有效期至2018-09-24"],
        "type": 1
    }
]

class UserMain extends Component {
    render() {
        const { currentTab, data, deletingOrderId } = this.props;
        return (
            <div className="userMain">
                <div className="userMain__menu">
                    {tabTitles.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="userMain__tab"
                                onClick={this.handleClickTab.bind(this, index)}
                            >
                <span
                    className={
                        currentTab === index
                            ? "userMain__title userMain__title--active"
                            : "userMain__title"
                    }
                >
                  {item}
                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="userMain__content">
                    {data && data.length > 0
                        ? this.renderOrderList(data)
                        : this.renderEmpty()}
                </div>
                {deletingOrderId ? this.renderConfirmDialog() : null}
            </div>
        );
    }

    renderOrderList = data => {
        const { commentingOrderId, orderComment, orderStars } = this.props;
        return data.map(item => {
            return (
                <OrderItem
                    key={item.id}
                    data={item}
                    isCommenting={item.id === commentingOrderId}
                    comment={item.id === commentingOrderId ? orderComment : ""}
                    stars={item.id === commentingOrderId ? orderStars : 0}
                    onCommentChange={this.handleCommentChange}
                    onStarsChange={this.handleStarsChange}
                    onComment={this.handleComment.bind(this, item.id)}
                    onRemove={this.handleRemove.bind(this, item.id)}
                    onSubmitComment={this.handleSubmitComment}
                    onCancelComment={this.handleCancelComment}
                />
            );
        });
    };

    renderEmpty = () => {
        return (
            <div className="userMain__empty">
                <div className="userMain__emptyIcon" />
                <div className="userMain__emptyText1">您还没有相关订单</div>
                <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
            </div>
        );
    };

    //删除对话框
    renderConfirmDialog = () => {
        const {
            userActions: { hideDeleteDialog, removeOrder }
        } = this.props;
        return (
            <Confirm
                content="确定删除该订单吗？"
                cancelText="取消"
                confirmText="确定"
                onCancel={hideDeleteDialog}
                onConfirm={removeOrder}
            />
        );
    };

    // 评价内容变化
    handleCommentChange = comment => {
        const {
            userActions: { setComment }
        } = this.props;
        setComment(comment);
    };

    // 订单评级变化
    handleStarsChange = stars => {
        const {
            userActions: { setStars }
        } = this.props;
        setStars(stars);
    };

    //选中当前要评价的订单
    handleComment = orderId => {
        const {
            userActions: { showCommentArea }
        } = this.props;
        showCommentArea(orderId);
    };

    //提交评价
    handleSubmitComment = () => {
        const {
            userActions: { submitComment }
        } = this.props;
        submitComment();
    };

    //取消评价
    handleCancelComment = () => {
        const {
            userActions: { hideCommentArea }
        } = this.props;
        hideCommentArea();
    };

    handleRemove = orderId => {
        this.props.userActions.showDeleteDialog(orderId);
    };

    handleClickTab = index => {
        this.props.userActions.setCurrentTab(index);
    };
}

const mapStateToProps = (state, props) => {
    return {
        currentTab: getCurrentTab(state),
        deletingOrderId: getDeletingOrderId(state),
        commentingOrderId: getCommentingOrderId(state),
        orderComment: getCurrentOrderComment(state),
        orderStars: getCurrentOrderStars(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserMain);