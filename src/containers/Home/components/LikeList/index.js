import React, { Component } from 'react';
import LikeItem from "../LikeItem"
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
    },
    {
        id: 6,
        shop: "shop6",
        tag: "tag6",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product6",
        currentPrice: "currentPrice6",
        oldPrice: "oldPrice6",
        saleDesc: "saleDesc6",
    },
    {
        id: 7,
        shop: "shop7",
        tag: "tag7",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product7",
        currentPrice: "currentPrice7",
        oldPrice: "oldPrice7",
        saleDesc: "saleDesc7",
    },
    {
        id: 8,
        shop: "shop8",
        tag: "tag8",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        product: "product8",
        currentPrice: "currentPrice8",
        oldPrice: "oldPrice8",
        saleDesc: "saleDesc8",
    },
]

class LikeList extends Component {

    render() {
        const data = dataSource
        return (
            <div className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return <LikeItem key={item.id} data={item}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default LikeList;