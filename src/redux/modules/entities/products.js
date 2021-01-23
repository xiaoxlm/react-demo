// const products = (state = {}, action) => {
//     return state
// }
//
// export default products()

export const schema = {
    name: "products",
    id: "id"
}

const reducer = (state = {}, action) => {
    // 因为一个action进入reducer，所有reducer的相关模块都要去判断这个action是否是需要自己处理
    // 而一般根据action.type判断是否符合reducer处理的条件
    // 但是这里是根据action的其他属性进行判断，同样合理，action.type的判断方式只是业界标准，并非程序标准
    if(action.response && action.response.products) {
        return {...state, ...action.response.products}
    }
    return state;
}

export default reducer;