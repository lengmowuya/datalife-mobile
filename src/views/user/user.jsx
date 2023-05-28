import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import AffairCareer from './affairCareer/affairCareer'
import ThoughtCareer from './thoughtCareer/thoughtCareer'
import {
    ExportOutlined,
    SettingOutlined
} from '@ant-design/icons';
import axios from 'axios';
import * as echarts from 'echarts';
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
import './user.less'
import Config from './../../tools/Config'

const User = ()=>{
    dayjs.locale('zh-cn');
    let navigate = useNavigate();
    let headImg = localStorage.getItem('headImg');
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    let userId = localStorage.getItem('id');
    let [recentAffairRecord,setRecentAffairRecord] = useState([]);
    let [xAxis,setXAxis] = useState([]);
    let [chartData,setChartData] = useState([]);
    const loginOut = ()=>{
        localStorage.setItem('token','');
        localStorage.setItem('id','');
        navigate('/login');
    }
    useEffect(()=>{
        userId = localStorage.getItem('id');
    })
    useEffect(()=>{
        // 梳理出7天
        let days = [];
        while(days.length < 7){
            if(days.length == 0){
                days.push(dayjs(new Date()));
            }else{
                // 倒推一天
                let prev = days[0];
                // console.log(prev);
                days.unshift(dayjs(prev).add(-1,'day'));
            }
        }
        console.log(days);
        for(let i = 0;i < days.length;i++){
            let item = days[i];
            days[i] = dayjs(item).format('dddd').replace('星期','周');
        }

        setXAxis(days);
    },[])
    useEffect(()=>{
        axios.get(Config.getIp()+'/affairRecord/recent7/'+userId)
            .then(docs=>{
                // console.log(docs.data);
                let mapList = xAxis.concat();
                let data = docs.data.reduce((prev,item,i)=>{
                    let week = dayjs(new Date(item.time)).format('dddd').replace('星期','周');
                    // 对比归类
                    for(let j = 0;j<mapList.length;j++){
                        if(week == mapList[j]){
                            if(prev[j] == undefined){
                                prev[j] = 0;
                            }
                            prev[j]++;
                        }
                    }
                    return prev;
                },[]);
                console.log(data);
                setChartData(data);
                
                // setRecentAffairRecord(docs.data);
            })
    },[xAxis])
    // 基于准备好的dom，初始化echarts实例
    useEffect(()=>{
        var myChart = echarts.init(document.querySelector('.chart'),null,{
            width: 376,
            height: 310
          });
        let option = {
            xAxis: {
              type: 'category',
              data: xAxis
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data:chartData,
                type: 'bar',
                // smooth: true
              }
            ]
          };
        myChart.setOption(option);
    })
    // 绘制图表

    // render() {  
        // let {headImg,name,email} = this.state;
    return (
        <div id='User'>
            <div className="userInfo">
                <img className='headImg' src={headImg} alt="" />
                <div className="infoDescribe">
                    <h1 className='name'>{name}</h1>
                    <p className='email'>{email}</p>
                </div>
            </div>
            <div className="chart">
            </div>
            <div className="career">
                <AffairCareer />
                <ThoughtCareer />
            </div>
            <div className="menu">
                {/* <div className="itemLine setting">
                    <SettingOutlined />设置
                </div> */}
                <div className="itemLine loginOut" onClick={loginOut.bind(this)}>
                    <ExportOutlined />登出
                </div>
            </div>
        </div>
    )
    // }
}

export default User