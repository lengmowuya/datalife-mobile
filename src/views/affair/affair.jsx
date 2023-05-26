import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button } from 'antd';
import {
    CaretUpOutlined,
    AppstoreOutlined,
    CarryOutOutlined,
    DropboxOutlined
  } from '@ant-design/icons'
import axios from 'axios';
import AffairLi from './affairLi/affairLi';
import RecordLi from './recordLi/recordLi';
import 'antd/dist/reset.css';
import styles from './affair.module.less';

const Affair = ()=>{
    const navigate = useNavigate();

    let [affairList,setAffairList] = useState([]);
    let [todayRecords,setTodayRecords] = useState([]);
    let [panelActive,setPanelActive] = useState(false);
    // let userId = '63d10e85b1b9bf8e3171a68b';
    let userId = localStorage.getItem('id');

    useEffect(()=>{
        if(!userId) return;
        axios.get('http://192.168.1.9:3000/affair/all/'+ userId)
            .then(docs=>{
                setAffairList(docs.data);
            })
        axios.get('http://192.168.1.9:3000/affairRecord/today/'+ userId)
            .then(docs=>{
                setTodayRecords(docs.data);
            })
    },[])
    const jump = (href)=>{
        navigate(href);
    }

    return (
        <div className={styles.content}
            onClick={()=>setPanelActive(false)}>
            <h3>今日完成记录</h3>
            <ul className={styles.recordList}>
                {
                    todayRecords.map(item=>{
                        return <RecordLi item={item} key={item._id} />
                    })
                }
                {todayRecords.length==0?(
                    <div className={styles.nullHint}>
                        <DropboxOutlined />
                        今日还没有事务已完成
                    </div>
                ):''}
            </ul>
            <div 
                id={styles.myAffairPanel} 
                className={[panelActive?styles.active:'']} 
                onClick={(e)=>{e.stopPropagation();setPanelActive(!panelActive);}}
            >
                <div className={styles.scrollHand}>
                    <h3>我的事务 </h3>  <CaretUpOutlined />
                </div>

                <ul className={styles.affairList}>
                    {
                        affairList.map(item=>{
                            return <AffairLi item={item} key={item._id} />
                        })
                    }
                    {affairList.length==0?(
                    <div className={styles.nullHint}>
                        {/* <DropboxOutlined /> */}
                        暂无事务,新建一个吧!
                    </div>
                ):''}
                </ul>

                <div className={styles.menu}>
                    <Button type="primary" icon={<AppstoreOutlined />} onClick={(e)=>{e.stopPropagation();jump('/manageAffair')}} >
                        管理事务
                    </Button>
                    <Button type="primary" icon={<CarryOutOutlined />} onClick={(e)=>{e.stopPropagation();jump('/newAffair')}}>
                        新建事务
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Affair