import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useParams,useNavigate  } from 'react-router-dom';
import './newAffair.less'

let affair = {};
let affairContext = '';
const NewAffair = ()=>{
    let [iconList,setIconList] = useState([]);
    let [panelActive,setPanelActive] = useState(false);
    let [activeIconIndex,setActiveIconIndex] = useState(0);
    const CreateAffair = ()=>{

    }
    useEffect(()=>{
        axios.get('http://192.168.1.9:3000/icon/all')
            .then(docs=>{
                console.log(docs.data);
                setIconList(docs.data);
                setActiveIconIndex(0);
            })
    },[])
    return (
        <div id='NewAffair' onClick={(e)=>{setPanelActive(false);}}>
            <div className="head">
                <div className='iconContainer' onClick={(e)=>{e.stopPropagation();setPanelActive(!panelActive);}}>
                    <svg className='icon' aria-hidden="true" >
                        {iconList.length != 0  ? <use href={'#icon-' + iconList[activeIconIndex].font_class} /> : ''}
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
            <Button type="primary" className='affairFinish' onClick={CreateAffair.bind(this,affairContext)}>完成</Button>
            <Button type="primary" className='affairCancel' onClick={()=>{navigate('/affair')}}>取消</Button>
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
                    {/* <h3>我的事务 </h3>  <CaretUpOutlined /> */}
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