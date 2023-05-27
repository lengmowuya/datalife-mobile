import React from 'react';
import tools from './../../../tools/Tools'
import './recordLi.less'
class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    render() {
        const {item} = this.props;
        return (
            <div id='recordLi'>
                <div className="head">
                    <div className='iconContainer'>
                        <svg className='icon' aria-hidden="true">
                            <use href={'#icon-' + item.affair.icon} />
                        </svg>
                        <svg className='shadow' aria-hidden="true">
                            <use href={'#icon-' + item.affair.icon} />
                        </svg>
                    </div>
                    <div className="info">
                        <div className='title'>{item.affair.name}</div>
                        <p className='describe'>{tools.getTimeString(item.affair)}</p>
                    </div>
                </div>
                <div className="sentence">
                    {item.sentence}
                </div>
            </div>
        )
    }
}

export default Component