import React,{useState,useEffect} from 'react';
import './thoughtCareer.less'
import {
    BulbOutlined
  } from '@ant-design/icons';
import axios from 'axios';
import Config from './../../../tools/Config'

const ThoughtCareer = ()=>{
    let [thoughtLength,setThoughtLength] = useState(0)
    let [thoughtDays,setThoughtDays] = useState(0)
    let userId = localStorage.getItem('id');
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    useEffect(()=>{
        axios.get(Config.getIp()+'/thought/length/'+userId)
            .then(docs=>{
                setThoughtLength(docs.data.length);
            })
        axios.get(Config.getIp()+'/thought/days/'+userId)
            .then(docs=>{
                setThoughtDays(docs.data.days);
            })
    },[])
    return (
        <div id='ThoughtCareer'>
            <div className="title">
                <div className="icon">
                    <BulbOutlined />
                </div>
                短语
            </div>
            <div className="details">
                <p>累计条数: <span className="num">{thoughtLength}</span>      </p>
                <p>累计天数: <span className="num">{thoughtDays}</span> </p>
            </div>
        </div>
    )
}

export default ThoughtCareer