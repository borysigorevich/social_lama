import React, {useContext} from 'react';
import './Topbar.css'
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Topbar = () => {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className={'topbarContainer'}>
            <div className="topbarLeft">
                <Link to={'/'} style={{textDecoration: 'none'}}>
                    <span className={'logo'}>K&B</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className={'searchIcon'}/>
                    <input type="text" className="searchInput" placeholder={'Search for friend, post or video'}/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLink">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={'/profile/' + user.username}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="img"
                         className={'topbarImg'}/>
                </Link>
            </div>
        </div>
    );
};

export default Topbar;