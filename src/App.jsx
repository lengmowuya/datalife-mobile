import { Link,Outlet } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  UserOutlined
} from '@ant-design/icons';
import './App.less'
export default function Root() {
    return (
      <div className='app'>
        <div className="detail">
            <Outlet />
        </div>
        <nav>
          <ul>
            <li className="active">
              <Link to={`affair`}><HomeOutlined />事务</Link>
            </li>
            <li>
              <Link to={`thought`}><BulbOutlined />想法</Link>
            </li>
            <li>
              <Link to={`user`}><UserOutlined />生涯</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }