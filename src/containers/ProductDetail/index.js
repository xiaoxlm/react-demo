import React, { Component } from "react";
import ProductOverview from "./components/ProductOverview";
import ShopInfo from "./components/ShopInfo";
import Detail from "./components/Detail";
import Remark from "./components/Remark";
import BuyButton from "./components/BuyButton"; // 1. 引入
import Header from "../../components/Header"; // 1. 引入

class ProductDetail extends Component {
    render() {
        return (
            <div>
                <Header title="团购详情" onBack={this.handleBack} grey /> {/*2. 使用 */}
                <ProductOverview />
                <ShopInfo />
                <Detail />
                <Remark />
                <BuyButton /> {/*2. 使用 */}
            </div>
        );
    }

    handleBack = () => {};
}

export default ProductDetail;