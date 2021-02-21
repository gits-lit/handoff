import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../Header';
import File from '../File';
import file from '../../assets/file.png';


import './style.scss';
import SearchIcon from '../../assets/search_icon.svg';

const ViewFilesPage = () => {
    return (<div className="filePage-wrapper">
        <Header base64="" />
        <div className="container">
            <div className="subContainer">
                <div id="title">
                    All Recent Files
                </div>

                <div className="search">
                    <img src={SearchIcon} />
                    <input type="text" className="bar" />
                </div>

                <div className="files">
                    <Link to='/app'>
                        <File name="snu.ho" date="23 mins" image={file} />
                    </Link>
                    <Link to='/app'>
                      <File new={true} />
                    </Link>
                </div>
            </div>
        </div>
    </div>);
};

export default ViewFilesPage;