import React from 'react';
import axios from 'axios';
import './completeAffair.less';
import { Button } from 'antd';
// import { useNavigate } from 'react-router-dom'
// const { TextArea } = Input;

class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            affairContext:'',
            affairId:'63d11f9f1bd727c45b8cc665',
        }
    }
    completeRecord(){
        const {affairContext,affairId} = this.state;
        let userId = '63d10e85b1b9bf8e3171a68b';
        if(affairContext.trim() != ''){
            let request = {
                sentence:affairContext,
                owner:userId,
                affair:affairId
            }
            axios.post('http://localhost:3000/affairRecord/add',request)
                .then(docs=>{
                    if(docs.data.type == 'success'){
                        alert('提交成功');
                        // const userIsInactive = useFakeInactiveUser();
                        // const navigate = useNavigate();
                        // navigate('/affair');
                        this.props.navigate('/affair')
                      
                        // useEffect(() => {
                        //   if (userIsInactive) {
                            // fake.logout();
                        //   }
                        // }, []);
                        // const navigate = useNavigate();
                        
                    }
                    // this.setState({affairList:docs.data});
                })
        }else{
            alert('感悟不能为空');
        }
    }
    componentDidMount() {}
    render() {
        return (
            <div id='completeAffair'>
                <h1>完成事项</h1>
                <textarea 
                    value={this.affairContext}
                    onChange={(e) => this.setState({affairContext:e.target.value})} 
                    cols="30" rows="10" placeholder="事务完成感悟..."></textarea>
                <Button type="primary" onClick={this.completeRecord.bind(this)}>完成</Button>
            </div>
        )
    }
}

export default Component