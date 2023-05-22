import React from 'react';
import { Link,Outlet } from "react-router-dom";
import styles from './affairLi.module.less'
class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    render() {
        const {item} = this.props;
        return (
            <Link to={`/completeAffair`} className={styles.content}>
                <div className={styles.iconContainer}>
                    <svg className={styles.icon} aria-hidden="true">
                        <use href={'#icon-' + item.icon} />
                    </svg>
                </div>
                <div className="info">
                    <div className={styles.title}>{item.name}</div>
                    <p className={styles.describe}>{item.describe}</p>
                </div>
            </Link>
        )
    }
}

export default Component