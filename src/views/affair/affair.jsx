import React from 'react';
import { Button } from 'antd';
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
            todayRecords:[]
        }
    }

    componentWillMount() {
        let userId = '63d10e85b1b9bf8e3171a68b';
        axios.get('http://localhost:3000/affair/all/'+ userId)
            .then(docs=>{
                // console.log(docs.data);
                this.setState({affairList:docs.data});
            })
        axios.get('http://localhost:3000/affairRecord/today/'+ userId)
            .then(docs=>{
                console.log(docs.data);
                this.setState({todayRecords:docs.data});
            })
    }
    render() {
        const {affairList,todayRecords} = this.state;
        return (
            <div className={styles.content}>
                <h3>今日完成</h3>
                <ul className='recordList'>
                    {
                        todayRecords.map(item=>{
                            return <RecordLi item={item} key={item._id} />
                        })
                    }
                </ul>
                <ul className={styles.affairList}>
                    {
                        affairList.map(item=>{
                            return <AffairLi item={item} key={item._id} />
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Component