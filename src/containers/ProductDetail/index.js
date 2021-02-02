import React, { Component } from "react"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProductOverview from "./components/ProductOverview"
import ShopInfo from "./components/ShopInfo"
import Detail from "./components/Detail"
import Remark from "./components/Remark"
import BuyButton from "./components/BuyButton"
import Header from "../../components/Header"
import {
    actions as detailActions,
    getProduct,
    getRelatedShop
} from "../../redux/modules/detail";

class ProductDetail extends Component {
    // 5. 编写交互行为
    render() {
        const { product, relatedShop } = this.props;
        return (
            <div>
                <Header title="团购详情" onBack={this.handleBack} grey />
                {product && <ProductOverview data={product} />}
                {relatedShop && (
                    <ShopInfo data={relatedShop} total={product.shopIds.length} />
                )}
                {product && (
                    <div>
                        <Detail data={product} />
                        <Remark data={product} />
                        <BuyButton productId={product.id} />
                    </div>
                )}
            </div>
        );
    }

    // 4. 组件挂载完毕
    componentDidMount() {
        const { product } = this.props;
        if (!product) {
            // 4.1 如果redux没有该产品的详情信息，就要重新请求
            const productId = this.props.match.params.id;
            this.props.detailActions.loadProductDetail(productId);
        } else if (!this.props.relatedShop) {
            this.props.detailActions.loadShopById(product.nearestShop);
        }
    }

    componentDidUpdate(preProps) {
        // 5. 第一次获取到产品详情时，需要继续获取关联的店铺信息
        if (!preProps.product && this.props.product) {
            this.props.detailActions.loadShopById(this.props.product.nearestShop);
        }
    }

    // 6. 返回按钮
    handleBack = () => {
        this.props.history.goBack();
    };
}

// 2. 创建mapStateToProps
const mapStateToProps = (state, props) => {
    const productId = props.match.params.id; // 2.1 从路由中拿到商品id
    return {
        product: getProduct(state, productId),
        relatedShop: getRelatedShop(state, productId)
    };
};

// 3. 创建mapDispatchToProps
const mapDispatchToProps = dispatch => {
    return {
        detailActions: bindActionCreators(detailActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);