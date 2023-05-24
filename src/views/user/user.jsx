import React from 'react';

class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        let headImg = localStorage.getItem('headImg');
        let name = localStorage.getItem('name');
        let email = localStorage.getItem('email');
        this.setState({headImg});
        this.setState({name});
        this.setState({email});
    }

    render() {
        let {headImg,name,email} = this.state;
        return (
            <div className='content'>
                <h1>{name}</h1>
                <p>{email}</p>
                <img src={headImg} alt="" />
            </div>
        )
    }
}

export default Component