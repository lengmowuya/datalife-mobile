import { Link,Outlet } from "react-router-dom";
import './App.less'
export default function Root() {
    return (
      <div id='app'>
      <div id="detail">
          <Outlet />
      </div>
      <nav>
        <ul>
          <li className="active">
            <Link  to={`affair`}>事务</Link>
          </li>
          <li>
            <Link to={`thought`}>想法</Link>
          </li>
          <li>
            <Link to={`user`}>生涯</Link>
          </li>
        </ul>
      </nav>
      </div>
    );
  }