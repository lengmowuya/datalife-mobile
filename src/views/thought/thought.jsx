import React,{useState,useEffect} from 'react';
import {Button} from 'antd'
import axios from 'axios';
import {
    DropboxOutlined
  } from '@ant-design/icons'
import tools from './../../tools/Tools'
import './thought.less'

import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
import Config from './../../tools/Config'
dayjs.locale("zh-cn");

const Thought = ()=>{
        let userId = localStorage.getItem('id');
        useEffect(()=>{
            userId = localStorage.getItem('id');
        })
        let [thoughtList,setThoughtList] = useState([]);
        let [thoughtText,setThoughtText] = useState('');
        let [dateList,setDateList] = useState([])
        // let [panelActive,setPanelActive] = useState(false);
        const getThoughtList = ()=>{
            if(!userId) return;
            axios.get(Config.getIp()+'/thought/all/'+ userId)
                .then(docs=>{
                    let dateObj= docs.data.reduce((prev,item)=>{
                        let date = 'date' + dayjs(new Date(item.time)).format('YYYY-MM-DD');
                        // console.log(prev);
                        if(prev[date] == undefined){
                            prev[date] = {thought:[],time:new Date(item.time)};
                        }
                        prev[date].thought.push(item);
                        return prev;
                    },{})
                    let dateList = Object.values(dateObj);
                    console.log(dateList);
                    dateList.sort((a,b)=>{
                        return b.time.getTime() - a.time.getTime();
                    })
                    setDateList(dateList);
                    setThoughtList(docs.data);
                })
        }

        useEffect(()=>{
            getThoughtList();
        },[])

        const createThought = ()=>{
            if(!thoughtText.trim() ) {return;}
            let newThought = {
                owner : localStorage.getItem('id'),
                text:thoughtText
            }
            axios.post(Config.getIp()+'/thought/add',newThought)
                .then(docs=>{
                    if(docs.data.type == 'success'){
                        setThoughtText('');
                        getThoughtList();
                    }else{
                        alert('提交错误,请联系管理员!');
                    }
                })
        }

        return (
            <div id='Thought'>
                <div className="thoughtList">
                    {
                        
                        dateList.map(item=>{
                            return (

                                <div className="dateLi" key={item.time}>
                                    <div className="dateTitle">
                                        <h3>{dayjs(item.time).format('YYYY-MM-DD')}</h3>
                                    </div>
                                    <div className="thoughtContainer">
                                        {
                                            item.thought.map(item=>{
                                                return (
                                                    <div className='thoughtLi' key={item._id}>
                                                        <div className="text">
                                                            {item.text}
                                                        </div>
                                                        <div className="time">
                                                            {dayjs(new Date(item.time)).fromNow().replace(' ','')}&nbsp;&nbsp;{tools.getTimeString(item)}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    {thoughtList.length==0?(
                        <div className='nullHint'>
                            <DropboxOutlined />
                            你还没有过任何感想
                        </div>
                    ):''}
                </div>
                <div className="thoughtControl">
                    <textarea type="text" 
                        className='thoughtInput' placeholder='此时此刻我在想什么' 
                        value={thoughtText}
                        onChange={(e)=>{setThoughtText(e.target.value)}}
                    />
                    <Button type="primary" 
                        className='thoughtPublish'
                        onClick={createThought.bind()}
                    >记录</Button>
                </div>
            </div>
        )
}

export default Thought