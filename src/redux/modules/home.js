import url from "../../utils/url"
import { FETCH_DATA } from "../middleware/api"
import { schema } from "./entities/products"

// actionTypes
export const types = {
    // 获取猜你喜欢请求
    FETCH_LIKE_REQUEST: "HOME/FETCH_LIKE_REQUEST",
    // 获取猜你喜欢请求成功
    FETCH_LIKE_SUCCESS: "HOME/FETCH_LIKE_SUCCESS",
    // 获取猜你喜欢请求失败
    FETCH_LIKE_FAILURE: "HOME/FETCH_LIKE_FAILURE",
}

export const actions = {
    loadLikes: () => {
        return (dispatch, getState) => {
            const endpoint = url.getProductList(0, 10)
            return dispatch(fetchLikes(endpoint))
        }
    },
}

// actionCreators
// export const actions = {
//     loadLikes: () => {
//         return (dispatch, getState) => {
//             dispatch(fetchLikesRequest())
//             return get(url.getProductList(0,10)).then(
//                 data => {
//                     dispatch(fetchLikesSuccess(data))
//                 },
//                 error => {
//                     dispatch(fetchLikesFailure(error))
//                 }
//             )
//         }
//     }
// }

const fetchLikes = (endpoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LIKE_REQUEST,
            types.FETCH_LIKE_SUCCESS,
            types.FETCH_LIKE_FAILURE
        ],
        endpoint,
        schema
    }
})

// const fetchLikesRequest = () => ({
//     type: types.FETCH_LIKE_REQUEST
// })
// const fetchLikesSuccess = (data) => ({
//     type: types.FETCH_LIKE_REQUEST,
//     data
// })
// const fetchLikesFailure = (error) => ({
//     type: types.FETCH_LIKE_FAILURE,
//     error
// })

const reducer = (state ={}, action) => {
    switch (action.type) {
        case types.FETCH_LIKE_REQUEST:
            // todo
            break;
        case types.FETCH_LIKE_SUCCESS:
            // todo
            break;
        case types.FETCH_LIKE_FAILURE:
            // todo
            break;
        default:
            return state
    }
}

export default reducer