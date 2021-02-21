import { Link } from "react-router-dom";

import './style.scss';
import logo from '../../assets/logo.png';

const Header = (props) => {
  return (
    <div className = "header">
      <img className="logo" src={logo} />
      <div className="side-header">
        <div className="link">
          View Files
        </div>
        <div className="link">
          Copy Link
        </div>
        <Link to={{
          pathname: "/l",
          search: `${props.base64}`}}s>
          <div className="deploy">
            Deploy
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header;