import React,{ useState,useEffect} from 'react';
import axios from 'axios';
import './completeAffair.less';
import { Button } from 'antd';
import { useParams,useNavigate  } from 'react-router-dom';
import Config from './../../tools/Config'
let navigate;
let affairId;
let userId = localStorage.getItem('id');


function completeRecord(affairContext){
    // const {affairContext,affairId} = this.state;
    if(affairContext.trim() != ''){
        let request = {
            sentence:affairContext,
            owner:userId,
            affair:affairId
        }
        axios.post(Config.getIp()+'/affairRecord/add',request)
            .then(docs=>{
                if(docs.data.type == 'success'){
                    alert('提交成功');
                    navigate('/affair');
                }
            })
    }else{
        alert('感悟不能为空');
    }
}

function Component (){
    let [affairContext, setAffairContext] = useState('');
    let {id} = useParams();
    affairId = id;
    // let [affairId, setAffairId] = useState(id);
    let [affair, setAffair] = useState({});
    navigate = useNavigate()
    console.log(userId);
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    useEffect(mounted,[]);
    function mounted(){
        axios.get(Config.getIp()+'/affair/single/'+userId+'/'+affairId)
            .then(docs=>{
                setAffair(docs.data);
                console.log(affair);
    
            })
    }

    return (
        <div id='CompleteAffair'>
            <h3>完成事务</h3>
            {/* <h2>完成事项</h2> */}
            <div className="head">
                <div className='iconContainer'>
                    <svg className='icon' aria-hidden="true">
                        <use href={'#icon-' + affair.icon} />
                    </svg>
                </div>
                <div className="info">
                    <div className='title'>{affair.name}</div>
                    <p className='describe'>{affair.describe}</p>
                </div>
            </div>
            <textarea 
                value={affairContext}
                onChange={(e) => setAffairContext(e.target.value)} 
                cols="30" rows="10" placeholder="事务完成感悟..."></textarea>
            <Button 
                type="primary" className='affairFinish' 
                onClick={completeRecord.bind(this,affairContext)}
            >完成</Button>
            <Button 
                type="primary" className='affairCancel' 
                onClick={()=>{navigate('/affair')}}
            >返回</Button>
        </div>
    )
}
export default Component