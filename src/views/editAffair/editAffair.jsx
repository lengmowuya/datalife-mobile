import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
  } from '@ant-design/icons'
import { useParams,useNavigate  } from 'react-router-dom';
import './editAffair.less'
import Config from './../../tools/Config'
// let affair = {};
let affairContext = '';
const EditAffair = ()=>{
    let navigate = new useNavigate();
    let {id} = useParams();
    let userId = localStorage.getItem('id');
    // let [affair,setAffair] = useState({});
    let [iconList,setIconList] = useState([]);
    let [affairName,setAffairName] = useState('');
    let [affairDescribe,setAffairDescribe] = useState('');
    let [panelActive,setPanelActive] = useState(false);
    let [activeIconIndex,setActiveIconIndex] = useState(0);
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    const CreateAffair = ()=>{
        console.log(affairName.trim(),affairDescribe.trim());
        if(!affairName.trim() || !affairDescribe.trim()) {alert('名称或描述不能为空!');return;}
        let newAffair = {
            id,
            name:affairName,
            describe:affairDescribe,
            icon:iconList[activeIconIndex].font_class
        }
        axios.post(Config.getIp()+'/affair/update',newAffair)
            .then(docs=>{
                console.log(docs);
                if(docs.data.type == 'success'){
                    alert('修改成功');
                    navigate('/manageAffair');
                }else{
                    alert('提交错误,请联系管理员!');
                }
            })
    }
    
    useEffect(()=>{
        axios.get(Config.getIp()+'/affair/single/'+userId+'/'+id)
        .then(docs=>{
            let affair = docs.data;
            // console.log(affair);
            setAffairName(affair.name);
            setAffairDescribe(affair.describe);
            setAffairDescribe(affair.describe);
            // 设置图标索引
            let index = 0;
            iconList.forEach((item,i)=>{
                if(item.font_class == affair.icon){index=i}
            });
            setActiveIconIndex(index);
        })

    },[iconList])
    useEffect(()=>{
        axios.get(Config.getIp()+'/icon/all')
            .then(docs=>{
                console.log(docs.data);
                setIconList(docs.data);
                setActiveIconIndex(0);
            })
    },[])

    const deleteAffair = ()=>{
        if(confirm('您确定要删除该事务吗,该操作不可逆!')){
            if(confirm('再次确认以继续删除该事务')){
                axios.post(Config.getIp()+'/affair/remove',{id})
                    .then(docs=>{
                        if(docs.data.type == 'success'){
                            setTimeout(()=>{
                                alert('事务已删除!');
                                navigate('/manageAffair');
                            },300)
                        }else{
                            alert('删除错误,请联系管理员!');
                        }
                    })
            }
        }
    }

    return (
        <div id='EditAffair' onClick={(e)=>{setPanelActive(false);}}>
            <h3>编辑事务</h3>
            <div className="head">
                <div className='iconContainer' onClick={(e)=>{e.stopPropagation();setPanelActive(!panelActive);}}>
                    <svg className='icon' aria-hidden="true" >
                        {iconList.length != 0  ? <use href={'#icon-' + iconList[activeIconIndex].font_class} /> : ''}
                    </svg>
                    <div className="editTip">
                    <   EditOutlined />
                    </div>
                </div>
                {/* <div className="info">
                    <div className='title'>{affair.name}</div>
                    <p className='describe'>{affair.describe}</p>
                </div> */}
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
            <Button 
                type="primary" className='affairFinish' 
                onClick={CreateAffair.bind(this,affairContext)}
            >修改</Button>
            <Button 
                type="primary" className='affairCancel' 
                onClick={()=>{navigate('/manageAffair')}}
            >取消</Button>


            <div 
                id='IconPanel'
                className={[panelActive?'active':'']} 
                onClick={(e)=>{e.stopPropagation()}}
            >
                <div className='scrollHand'>
                    <svg className='icon' aria-hidden="true">
                        {iconList.length != 0  ? <use href={'#icon-' + iconList[activeIconIndex].font_class} /> : ''}
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
                                        <use href={'#icon-' + item.font_class}  />
                                    </svg>
                                </div>
                            )
                                
                        })
                    }
                </ul>
            </div>

            <div className="deleteAffair" onClick={deleteAffair.bind(this)}>
                <DeleteOutlined />删除事务
            </div>
        </div>
    )
}

export default EditAffair;