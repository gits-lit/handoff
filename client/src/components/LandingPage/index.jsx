import { Button, Input } from 'antd';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import './style.scss';

import brimg from '../../assets/br-img.svg';
import blimg from '../../assets/bl-img.svg';
import trimg from '../../assets/tr-img.svg';
import trimg2 from '../../assets/tr-img2.svg';
import tlimg from '../../assets/tl-img.svg';
import logo from '../../assets/logo.svg';
import revol from '../../assets/revol.svg';

const { Search } = Input;

export const LandingPage = () => {
  let history = useHistory();
  const onSearch = (value) => history.push('/viewFiles');

  return (
    <div className="LandingPage">
      <div className="nav">
        <img src={logo} alt="logo" className="logo" />
        <div className="signs">
          <Link to="/viewFiles">
            <h3>Log In</h3>
          </Link>
          <Link to="/viewFiles">
            <Button className="start">Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className="m-col">
        <img src={revol} alt="m-img" className="mimg" />
        <h2>A no-code platform for collaborative</h2>
        <h2>web development</h2>
        <div className="search">
          <Search
            className="searchinput"
            placeholder="Enter your name"
            enterButton="  >  "
            style={{ width: 500 }}
            onSearch={onSearch}
          />
        </div>
      </div>
      <img src={brimg} alt="illustration" className="brimg" />
      <img src={blimg} alt="illustration" className="blimg" />
      <img src={trimg} alt="illustration" className="trimg" />
      <img src={trimg2} alt="illustration" className="trimg2" />
      <img src={tlimg} alt="illustration" className="tlimg" />
    </div>
  );
};

export default LandingPage;
