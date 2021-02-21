import { Link } from "react-router-dom";
import { notification } from 'antd';

import './style.scss';
import logo from '../../assets/logo.png';

import {
  useLocation
} from "react-router-dom";

const openNotification = () => {
  notification.info({
    message: 'Copied url!',
    placement: 'bottomRight',
  });
};

const Header = (props) => {
  let location = useLocation();
  return (
    <div className = "header">
      <Link to='/'>
      <img className="logo" src={logo} />
      </Link>
      {props.enabled && <div className="side-header">
      <Link to='/viewFiles'>
        <div className="link">
          View Files
        </div>
        </Link>
        <div className="link" onClick={() => {
          const textArea = document.createElement("textarea");
          if (location) {
            textArea.value = window.location.hostname + location.pathname + '?' + Date.now();
            document.body.appendChild(textArea);
          }
          textArea.focus();
          textArea.select();

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            console.log(textArea.value);
            openNotification();
          } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
          }
        
          document.body.removeChild(textArea);
        }}>
          Copy Link
        </div>
        <Link to={{
          pathname: "/l",
          search: `${props.base64}`}}>
          <div className="deploy">
            <h3>Deploy</h3>
          </div>
        </Link>
      </div>}
    </div>
  )
}

export default Header;