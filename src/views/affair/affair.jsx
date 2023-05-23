import React from 'react';
import { Button } from 'antd';
import {
    CaretUpOutlined
  } from '@ant-design/icons'
import axios from 'axios';
import AffairLi from './affairLi/affairLi';
import RecordLi from './recordLi/recordLi';
import 'antd/dist/reset.css';
import styles from './affair.module.less';
class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            affairList:[],
            todayRecords:[],
            panelActive:false
        }
    }

    componentWillMount() {
        let userId = '63d10e85b1b9bf8e3171a68b';
        axios.get('http://192.168.1.9:3000/affair/all/'+ userId)
            .then(docs=>{
                // console.log(docs.data);
                this.setState({affairList:docs.data});
            })
        axios.get('http://192.168.1.9:3000/affairRecord/today/'+ userId)
            .then(docs=>{
                console.log(docs.data);
                this.setState({todayRecords:docs.data});
            })
    }
    render() {
        const {affairList,todayRecords,panelActive} = this.state;
        return (
            <div className={styles.content}
                onClick={()=>this.setState({panelActive:false})}>
                <h3>今日完成记录</h3>
                <ul className={styles.recordList}>
                    {
                        todayRecords.map(item=>{
                            return <RecordLi item={item} key={item._id} />
                        })
                    }
                </ul>
                <div 
                    id={styles.myAffairPanel} 
                    className={[panelActive?styles.active:'']} 
                    onClick={(e)=>{e.stopPropagation();this.setState({panelActive:!panelActive});}}>
                    <div className={styles.scrollHand}>
                        <h3>我的事务 </h3>  <CaretUpOutlined />
                    </div>
                    <ul className={styles.affairList}>
                        {
                            affairList.map(item=>{
                                return <AffairLi item={item} key={item._id} />
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Component