import React,{useState,useEffect} from 'react';
import './affairCareer.less'
import {
    CheckSquareOutlined
  } from '@ant-design/icons';
import axios from 'axios';
import Config from './../../../tools/Config'

const AffairCareer = ()=>{
    let [affairRecordLength,setAffairRecordLength] = useState(0)
    let [affairRecordDays,setAffairRecordDays] = useState(0)
    let userId = localStorage.getItem('id');
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    useEffect(()=>{
        axios.get(Config.getIp()+'/affairRecord/length/'+userId)
            .then(docs=>{
                setAffairRecordLength(docs.data.length);
            })
        axios.get(Config.getIp()+'/affairRecord/days/'+userId)
            .then(docs=>{
                setAffairRecordDays(docs.data.days);
            })
    },[])
    return (
        <div id='AffairCareer'>
            <div className="title">
                <div className="icon">
                    <CheckSquareOutlined />
                </div>
                事务
            </div>
            <div className="details">
                <p>累计记录: <span className="num">{affairRecordLength}</span>      </p>
                <p>累计天数: <span className="num">{affairRecordDays}</span> </p>
            </div>
        </div>
    )
}

export default AffairCareer