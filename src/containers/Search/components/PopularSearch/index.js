import React, { Component } from 'react';
import "./style.css"

// const data = ['三里屯','朝阳大悦城','西单','海底捞','星巴克','局气','火锅','温泉','烤鸭']

class PopularSearch extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="popularSearch">
                {
                    data.map((item,index) => {
                        return (
                            <span key={item.id} className="popularSearch__item">{item.keyword}</span>
                        )
                    })
                }
            </div>
        );
    }
}

export default PopularSearch;