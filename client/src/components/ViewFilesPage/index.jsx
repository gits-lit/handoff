import React, { useState } from 'react';
import Header from '../Header';
import File from '../File';

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
                    <File name="Snu" date="23 mins" image="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p100x100/42545098_2368155929864626_413624501863972864_n.jpg?_nc_cat=111&ccb=3&_nc_sid=7206a8&_nc_ohc=PHcVXKwpVBgAX-pb1js&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-lax3-2.xx&tp=6&oh=2302061814f8531d526f9897e11d4264&oe=6056E829" />
                    <File name="Snu" date="23 mins" image="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p100x100/42545098_2368155929864626_413624501863972864_n.jpg?_nc_cat=111&ccb=3&_nc_sid=7206a8&_nc_ohc=PHcVXKwpVBgAX-pb1js&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-lax3-2.xx&tp=6&oh=2302061814f8531d526f9897e11d4264&oe=6056E829" />
                    <File name="Snu" date="23 mins" image="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p100x100/42545098_2368155929864626_413624501863972864_n.jpg?_nc_cat=111&ccb=3&_nc_sid=7206a8&_nc_ohc=PHcVXKwpVBgAX-pb1js&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-lax3-2.xx&tp=6&oh=2302061814f8531d526f9897e11d4264&oe=6056E829" />
                    <File name="Snu" date="23 mins" image="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p100x100/42545098_2368155929864626_413624501863972864_n.jpg?_nc_cat=111&ccb=3&_nc_sid=7206a8&_nc_ohc=PHcVXKwpVBgAX-pb1js&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-lax3-2.xx&tp=6&oh=2302061814f8531d526f9897e11d4264&oe=6056E829" />
                    <File name="Snu" date="23 mins" image="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p100x100/42545098_2368155929864626_413624501863972864_n.jpg?_nc_cat=111&ccb=3&_nc_sid=7206a8&_nc_ohc=PHcVXKwpVBgAX-pb1js&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-lax3-2.xx&tp=6&oh=2302061814f8531d526f9897e11d4264&oe=6056E829" />
                    
                    <File new={true} />
                </div>
            </div>
        </div>
    </div>);
};

export default ViewFilesPage;