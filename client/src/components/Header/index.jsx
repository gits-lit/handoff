import './style.scss';
import logo from '../../assets/logo.png';

const Header = () => {
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
        <div className="deploy">
          Deploy
        </div>
      </div>
    </div>
  )
}

export default Header;