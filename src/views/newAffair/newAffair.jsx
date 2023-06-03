import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import {
    EditOutlined,
    CarryOutOutlined
  } from '@ant-design/icons'
import { useParams,useNavigate  } from 'react-router-dom';
import './newAffair.less'
import Config from './../../tools/Config'

let affair = {};
let affairContext = '';
const NewAffair = ()=>{
    let navigate = new useNavigate();
    let [iconList,setIconList] = useState([]);
    let [affairName,setAffairName] = useState('');
    let [affairDescribe,setAffairDescribe] = useState('');
    let [panelActive,setPanelActive] = useState(false);
    let [activeIconIndex,setActiveIconIndex] = useState(0);
    let userId = localStorage.getItem('id');
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    const CreateAffair = ()=>{
        console.log(affairName.trim(),affairDescribe.trim());
        if(!affairName.trim() || !affairDescribe.trim()) {alert('名称或描述不能为空!');return;}
        let newAffair = {
            owner : userId,
            name:affairName,
            describe:affairDescribe,
            icon:iconList[activeIconIndex]._id
        }
        axios.post(Config.getIp()+'/affair/add',newAffair)
            .then(docs=>{
                if(docs.data.type == 'success'){
                    alert('新事物创建成功');
                    navigate('/affair');
                }else{
                    alert('提交错误,请联系管理员!');
                }
            })
    }
    useEffect(()=>{
        axios.get(Config.getIp()+'/icon/all')
            .then(docs=>{
                console.log(docs.data);
                setIconList(docs.data);
                setActiveIconIndex(0);
            })
    },[])
    return (
        <div id='NewAffair' onClick={(e)=>{setPanelActive(false);}}>
            <h3><CarryOutOutlined />新建事务</h3>
            <div className="head">
                <div className='iconContainer' onClick={(e)=>{e.stopPropagation();setPanelActive(!panelActive);}}>
                    <svg className='icon' aria-hidden="true" >
                        {iconList.length != 0  ? <use href={`#icon${iconList[activeIconIndex].group}-` + iconList[activeIconIndex].font_class} /> : ''}
                    </svg>
                    <div className="editTip">
                    <   EditOutlined />
                    </div>
                </div>
                <div className="info">
                    <div className='title'>{affair.name}</div>
                    <p className='describe'>{affair.describe}</p>
                </div>
            </div>
            <input 
                value={affairName}
                onChange={(e) => setAffairName(e.target.value)} 
                cols="30" rows="10" placeholder="事务名称"
            />
            <input 
                value={affairDescribe}
                onChange={(e) => setAffairDescribe(e.target.value)} 
                cols="30" rows="10" placeholder="事务描述"
            />
            <div className="buttonMenu">
                <Button 
                    type="primary" className='affairFinish' 
                    onClick={CreateAffair.bind(this,affairContext)}
                >创建</Button>
                <Button 
                    type="primary" className='affairCancel' 
                    onClick={()=>{navigate('/affair')}}
                >返回</Button>
            </div>
            <div 
                id='IconPanel'
                className={[panelActive?'active':'']} 
                onClick={(e)=>{e.stopPropagation()}}
            >
                <div className='scrollHand'>
                    <svg className='icon' aria-hidden="true">
                        {iconList.length != 0  ? <use href={`#icon${iconList[activeIconIndex].group}-` + iconList[activeIconIndex].font_class} /> : ''}
                    </svg>
                    <p>{iconList.length != 0  ?iconList[activeIconIndex].name:''}</p>
                </div>
                <ul className='iconList'>
                    {
                        iconList.map((item,i)=>{
                            return (
                                <div 
                                    className={['iconLi ',activeIconIndex==i?'active':''].join('')} 
                                    key={item._id} 
                                    onClick={()=>{setActiveIconIndex(i)}}
                                    title={item.name}
                                >
                                    <svg className='icon' aria-hidden="true">
                                        <use href={`#icon${item.group}-` + item.font_class}  />
                                    </svg>
                                </div>
                            )
                                
                        })
                    }
                </ul>
                {/* <div className='menu'>
                    <Button type="primary" onClick={(e)=>{e.stopPropagation();jump('/manageAffair')}} >
                        管理事务
                    </Button>
                    <Button type="primary"  onClick={(e)=>{e.stopPropagation();jump('/newAffair')}}>
                        新建事务
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default NewAffair