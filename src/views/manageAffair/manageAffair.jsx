import React,{useState,useEffect} from 'react';
import AffairLi from './affairLi/affairLi';
import axios from 'axios';
import {
    DropboxOutlined,
    AppstoreOutlined
  } from '@ant-design/icons'
import './manageAffair.less'
import Config from './../../tools/Config'
// let affairList = [];
const ManageAffair = ()=>{
    let [affairList,setAffairList] = useState([]);
    let userId = localStorage.getItem('id');
    // let [affairList,setAffairList] = useState([]);
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    useEffect(()=>{
        axios.get(Config.getIp()+'/affair/all/'+ userId)
        .then(docs=>{
            setAffairList(docs.data);
        })
    },[])
    return (
        <div id='ManageAffair'>
            <h3><AppstoreOutlined />事务管理页</h3>
            {
                affairList.map(item=>{
                    return <AffairLi item={item} key={item._id} />
                })
            }
            {affairList.length==0?(
                <div className='nullHint'>
                    <DropboxOutlined />
                    你还没有事务可管理
                </div>
            ):''}
        </div>
    )
}

export default ManageAffair