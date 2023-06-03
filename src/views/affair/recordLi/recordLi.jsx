import React from 'react';
import tools from './../../../tools/Tools'
import './recordLi.less'
import 'dayjs/locale/zh-cn'
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const RecordLi = (props)=>{
    // const rtf = new Intl.RelativeTimeFormat('zh-cn');
    const {item} = props;
    return (
        <div id='recordLi'>
            <div className="head">
                <div className='iconContainer'>
                    <svg className='icon' aria-hidden="true">
                        <use href={`#icon${item.affair.icon.group}-${item.affair.icon.font_class}`} />
                    </svg>
                    <svg className='shadow' aria-hidden="true">
                        <use href={`#icon${item.affair.icon.group}-${item.affair.icon.font_class}`} />
                    </svg>
                </div>
                <div className="info">
                    <div className='title'>{item.affair.name}</div>
                    <p className='describe'>{dayjs(new Date(item.time)).fromNow()}</p>
                </div>
            </div>
            <div className="sentence">
                {item.sentence}
            </div>
        </div>
    )
}
export default RecordLi;