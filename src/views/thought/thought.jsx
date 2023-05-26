import React,{useState,useEffect} from 'react';
import {Button} from 'antd'
import axios from 'axios';
import {
    DropboxOutlined
  } from '@ant-design/icons'
import './thought.less'

const Thought = ()=>{
        let userId = localStorage.getItem('id');
        let [thoughtList,setThoughtList] = useState([]);
        let [thoughtText,setThoughtText] = useState('');
        // let [panelActive,setPanelActive] = useState(false);
        const getThoughtList =()=>{
            if(!userId) return;
            axios.get('http://192.168.1.9:3000/thought/all/'+ userId)
                .then(docs=>{
                    setThoughtList(docs.data);
                })
        }
        useEffect(()=>{
            getThoughtList();
        },[])
        const createThought = ()=>{
            if(!thoughtText.trim() ) {return;}
            let newThought = {
                owner : localStorage.getItem('id'),
                text:thoughtText
            }
            axios.post('http://192.168.1.9:3000/thought/add',newThought)
                .then(docs=>{
                    if(docs.data.type == 'success'){
                        setThoughtText('');
                        getThoughtList();
                    }else{
                        alert('提交错误,请联系管理员!');
                    }
                })
        }
        return (
            <div id='Thought'>
                <div className="thoughtList">
                    {
                        thoughtList.map(item=>{
                            return (
                                <div className='thoughtLi' key={item._id}>
                                    {item.text}
                                </div>
                            )
                        })
                    }
                    {thoughtList.length==0?(
                        <div className='nullHint'>
                            <DropboxOutlined />
                            你还没有过任何感想
                        </div>
                    ):''}
                </div>
                <div className="thoughtControl">
                    <textarea type="text" 
                        className='thoughtInput' placeholder='此时此刻我在想什么' 
                        value={thoughtText}
                        onChange={(e)=>{setThoughtText(e.target.value)}}
                    />
                    <Button type="primary" 
                        className='thoughtPublish'
                        onClick={createThought.bind()}
                    >记录</Button>
                </div>
            </div>
        )
}

export default Thought