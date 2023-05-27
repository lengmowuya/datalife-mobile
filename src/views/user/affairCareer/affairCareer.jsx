import React,{useState,useEffect} from 'react';
import './affairCareer.less'
import {
    CheckSquareOutlined
  } from '@ant-design/icons';
import axios from 'axios';

const AffairCareer = ()=>{
    let [affairRecordLength,setAffairRecordLength] = useState(0)
    let [affairRecordDays,setAffairRecordDays] = useState(0)
    let userId = localStorage.getItem('id');
    useEffect(()=>{
        axios.get('http://192.168.1.9:3000/affairRecord/length/'+userId)
            .then(docs=>{
                setAffairRecordLength(docs.data.length);
            })
        axios.get('http://192.168.1.9:3000/affairRecord/days/'+userId)
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
                <p>累计完成数: <span className="num">{affairRecordLength}</span>      </p>
                <p>累计天数: <span className="num">{affairRecordDays}</span> </p>
            </div>
        </div>
    )
}

export default AffairCareer