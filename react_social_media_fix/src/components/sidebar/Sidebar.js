import React from 'react';
import './sidebar.css'
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GroupIcon from '@material-ui/icons/Group';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import EventIcon from '@material-ui/icons/Event';
import SchoolIcon from '@material-ui/icons/School';
import {Users} from '../../dummyData'
import CloseFriend from "../closeFriend/CloseFriend";

const Sidebar = () => {
    return (
        <div className={'sidebar'}>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutlineIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutlineIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <EventIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <SchoolIcon className={'sidebarIcon'}/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className={'sidebarButton'}>Show more</button>
                <hr className={'sidebarHr'}/>
                <ul className="sidebarFriendList">
                    {Users.map(user => <CloseFriend key={user.id} user={user}/>)}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;