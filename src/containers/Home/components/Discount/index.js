import React, { Component } from "react";
import "./style.css"

const dataSource = [
    {
        id: 1,
        url: "http://www.baidu.com",
        picture: "https://h5.dianping.com/app/h5-ranklist-static/list_nearby.html?collectionId=227&source=weixinM",
        shop: "shop",
        currentPrice: "currentPrice",
        oldPrice: "oldPrice"
    }
]

class Discount extends Component {
    render() {
        const data = dataSource;
        return (
            <div className="discount">
                <a className="discount__header">
                    <span className="discount__title">超值特惠</span>
                    <span className="discount__more">更多优惠</span>
                    <span className="discount__arrow" />
                </a>
                <div className="discount__content">
                    {data.map((item, index) => {
                        return (
                            <a key={item.id} className="discount__item" href={item.url}>
                                <div className="discount__itemPic">
                                    <img width="100%" height="100%" src={item.picture} />
                                </div>
                                <div className="discount__itemTitle">{item.shop}</div>
                                <div className="discount__itemPriceWrapper">
                                    <ins className="discount__itemCurrentPrice">
                                        {item.currentPrice}
                                    </ins>
                                    <del className="discount__itemOldPrice">{item.oldPrice}</del>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Discount;