import React, { Component } from 'react';
import LikeItem from "../LikeItem"
import Loading from "../../../../components/Loading"
import "./style.css"

const dataSource = [
    {
        id: 1,
        shop: "shop1",
        tag: "tag1",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product1",
        currentPrice: "currentPrice1",
        oldPrice: "oldPrice1",
        saleDesc: "saleDesc1",
    },
    {
        id: 2,
        shop: "shop2",
        tag: "tag2",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product2",
        currentPrice: "currentPrice2",
        oldPrice: "oldPrice2",
        saleDesc: "saleDesc2",
    },
    {
        id: 3,
        shop: "shop3",
        tag: "tag3",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product3",
        currentPrice: "currentPrice3",
        oldPrice: "oldPrice3",
        saleDesc: "saleDesc3",
    },
    {
        id: 4,
        shop: "shop4",
        tag: "tag4",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product4",
        currentPrice: "currentPrice4",
        oldPrice: "oldPrice4",
        saleDesc: "saleDesc4",
    },
    {
        id: 5,
        shop: "shop5",
        tag: "tag5",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product5",
        currentPrice: "currentPrice5",
        oldPrice: "oldPrice5",
        saleDesc: "saleDesc5",
    }
]

class LikeList extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef(); // 7 .使用react中的ref属性
        this.state = {
            data: dataSource, // 1. 初始列表数据
            loadTimes: 1,    // 2. 当前加载次数
        }

        this.removeListener = false; // 15. 标记对scroll的监听函数是否被移除
    }

    render() {
        const {loadTimes} = this.state;
        let data = this.props.data
        // console.log("props.data:", this.props.data)
        return (
            // 8. 获取likeList最外层的div的ref
            <div ref={this.myRef} className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return <LikeItem key={index} data={item}/>
                        })
                    }
                </div>
                {
                    loadTimes < 3 ?
                        ( // 3. 当加载次数小于3的时候，我们会自动加载数据，这里展示一个加载的组件
                            <Loading/>
                        ):
                        ( // 4. 当加载次数> 3的时候，我们就展示查看更多的连接
                            <a className="likeList__viewAll">
                                查看更多
                            </a>
                        )
                }
            </div>
        );
    }

    componentDidMount() {
        if (this.props.pageCount < 3) {
            document.addEventListener("scroll", this.handleScroll);
        } else {
            this.removeListener = true
        }
        if (this.props.pageCount === 0) {
            this.props.fetchData()
        }
        // 5. 添加对滚动事件的监听，处理函数是handleScroll
        // document.addEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate() {
        // 14. 如果已经自动加载了两次，就应该解除对scroll的监听
        if(this.state.loadTimes >= 3 && !this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll);
            this.removeListener = true;
        }
    }

    componentWillUnmount() {
        // 16. 当监听没有被移除的时候，我们就要去移除，如果已经移除，就不需要重复移除了
        if(!this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll)
        }
    }

    // 6. 处理屏幕滚动事件，实现加载更多的效果
    handleScroll = () => {
        // 9，scrollTop为页面滚动的距离（兼容）
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 10. screenHeight为屏幕可视高度
        const screenHeight = document.documentElement.clientHeight;
        // 11. likeList组件距离顶部的距离
        const likeListTop = this.myRef.current.offsetTop;
        // 12. likeListHeight为组件内容的高度
        const likeListHeight = this.myRef.current.offsetHeight;
        // 13. 滑动距离如果超过了我们计算出来的滑动距离，说明已经滑动到当前LikeList的底部了
        if(scrollTop >= likeListHeight + likeListTop - screenHeight) {
            const newData = this.state.data.concat(dataSource);
            const newLoadTimes = this.state.loadTimes + 1;
            setTimeout(() => {
                this.setState({
                    data: newData,
                    loadTimes: newLoadTimes
                })
            }, 1000)
        }
    }
}

export default LikeList;