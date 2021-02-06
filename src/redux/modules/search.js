import url from "../../utils/url"
import { FETCH_DATA } from "../middleware/api"
import { schema as keywordSchema } from "./entities/keywords"
import { combineReducers } from 'redux'
import { getKeywordById } from "./entities/keywords"

export const types = {
    //根据输入的文本获取相关关键词
    FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
    FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
    FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
    //获取热门关键词
    FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
    FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
    FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
    // 设置当前输入
    SET_INPUT_TEXT: "SEARCH/SET_INPUT_TEXT",
    // 清除当前输入
    CLEAR_INPUT_TEXT: "SEARCH/CLEAR_INPUT_TEXT",
    // 历史查询记录
    ADD_HISTORY_KEYWORD: "SEARCH/ADD_HISTORY_KEYWORD",
    // 删除历史记录
    CLEAR_HISTORY_KEYWORDS: "SEARCH/CLEAR_HISTORY_KEYWORDS",
}

export const actions = {
    // 根据输入获取相关关键词
    loadRelatedKeywords: (text) => {
        return (dispatch, getState) => {
            // 简单的判断当前是否有缓存
            const { relatedKeywords } = getState().search;
            if(relatedKeywords[text]){
                return null
            }
            // 没有缓存就重新请求
            const endpoint = url.getRelatedKeywords(text)
            return dispatch(fetchRelatedKeywords(text, endpoint))
        }
    },
    //获取热门关键词
    loadPopularKeywords: () => {
        return (dispatch, getState) => {
            // 简单的判断当前是否有缓存
            const { ids } = getState().search.popularKeywords;
            if(ids.length > 0) {
                return null;
            }
            // 没有缓存就重新请求
            const endpoint = url.getPopularKeywords();
            return dispatch(fetchPopularKeywords(endpoint));
        }
    },
    //搜索框输入文本相关action
    setInputText: text => ({
        type: types.SET_INPUT_TEXT,
        text
    }),
    clearInputText: () => ({
        type: types.CLEAR_INPUT_TEXT
    }),
    //历史查询记录相关action
    addHistoryKeyword: keywordId => ({
        type: types.ADD_HISTORY_KEYWORD,
        text: keywordId
    }),
    clearHistoryKeywords: () => ({
        type: types.CLEAR_HISTORY_KEYWORDS
    })
}

const fetchPopularKeywords = endpoint => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_POPULAR_KEYWORDS_REQUEST,
            types.FETCH_POPULAR_KEYWORDS_SUCCESS,
            types.FETCH_POPULAR_KEYWORDS_FAILURE,
        ],
        endpoint,
        schema: keywordSchema
    }
})

const fetchRelatedKeywords = (text, endpoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_RELATED_KEYWORDS_REQUEST,
            types.FETCH_RELATED_KEYWORDS_SUCCESS,
            types.FETCH_RELATED_KEYWORDS_FAILURE,
        ],
        endpoint,
        schema: keywordSchema
    },
    text
})

const initialState = {
    inputText: "",
    popularKeywords: {
        isFetching: false,
        ids: []
    },
    /**
     * relatedKeywords对象结构：
     * {
     *   '火锅': {
     *       isFetching: false,
     *       ids: []
     *    }
     * }
     */
    relatedKeywords: {

    },
    historyKeywords: []  //保存关键词id
}

// 热门关键字的reducers
const popularKeywords = (state = initialState.popularKeywords, action) => {
    switch (action.type) {
        case types.FETCH_POPULAR_KEYWORDS_REQUEST:
            return { ...state, isFetching: true };
        case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids) // 使用concat是为了保证返回新的数组
            };
        case types.FETCH_POPULAR_KEYWORDS_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
};

// 根据输入查找相关的关键字
const relatedKeywords = (state = initialState.relatedKeywords, action) => {
    switch (action.type) {
        case types.FETCH_RELATED_KEYWORDS_REQUEST:
        case types.FETCH_RELATED_KEYWORDS_SUCCESS:
        case types.FETCH_RELATED_KEYWORDS_FAILURE:
            return {
                ...state,
                [action.text]: relatedKeywordsByText(state[action.text], action)
            };
        default:
            return state;
    }
};

const relatedKeywordsByText = (
    state = { isFetching: false, ids: [] },
    action
) => {
    switch (action.type) {
        case types.FETCH_RELATED_KEYWORDS_REQUEST:
            return { ...state, isFetching: true };
        case types.FETCH_RELATED_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            };
        case types.FETCH_RELATED_KEYWORDS_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

// 输入框相关的reducer
const inputText = (state = initialState.inputText, action) =>{
    switch(action.type) {
        case types.SET_INPUT_TEXT:
            return action.text
        case types.CLEAR_INPUT_TEXT:
            return ""
        default:
            return state
    }
}

// 历史记录相关的reducer
const historyKeywords = (state = initialState.historyKeywords, action) => {
    switch(action.type) {
        case types.ADD_HISTORY_KEYWORD:
            const data = state.filter(item => {
                return item !== action.text;

            })
            return [action.text, ...data];
        case types.CLEAR_HISTORY_KEYWORDS:
            return [];
        default:
            return state;
    }
};

const reducer = combineReducers({
    popularKeywords,
    relatedKeywords,
    inputText,
    historyKeywords
})

export default reducer;

// selectors
export const getPopularKeywords = state => {
    // console.log("getPopularKeywords state:", state)
    return state.search.popularKeywords.ids.map(id => {
        return getKeywordById(state, id)
    })
}

export const getRelatedKeywords = state => {
    const text = state.search.inputText;
    if(!text || text.trim().length === 0) {
        return [];
    }
    const relatedKeywords = state.search.relatedKeywords[text];
    if(!relatedKeywords) {
        return []
    }
    return relatedKeywords.ids.map(id => {
        return getKeywordById(state, id)
    })
}

export const getInputText = state => {
    return state.search.inputText
}

export const getHistoryKeywords = state => {
    return state.search.historyKeywords.map(id => {
        return getKeywordById(state, id)
    })
}