import React, {useContext, useEffect, useState} from 'react';
import './rightbar.css'
import {Users} from '../../dummyData'
import Online from "../online/Online";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {Add} from '@material-ui/icons'

const Rightbar = ({user}) => {
        const PF = process.env.REACT_APP_PUBLIC_FOLDER
        const [friends, setFriends] = useState([])
        const {user: currentUser} = useContext(AuthContext)
        useEffect(() => {
            const getFriends = async () => {
                try {
                    const friendList = await axios.get('/users/friends/' + user._id)
                    setFriends(friendList.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getFriends()
        }, [user._id])

        const HomeRightbar = () => {
            return <>
                <div className="birthdayContainer">
                    <img src={`${PF}gift.png`} alt="img" className={'birthdayImg'}/>
                    <span className={'birthdayText'}>
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src={`${PF}ad.png`} alt="img" className={'rightbarAd'}/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user => {
                        return <Online key={user.id} user={user}/>
                    })}
                </ul>
            </>
        }

        const ProfileRightbar = () => {
            return <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton">
                        Follow<Add/>
                    </button>
                )}
                <h4 className={'rightbarTitle'}>User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className={'rightbarInfoKey'}>City:</span>
                        <span className={'rightbarInfoValue'}>{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className={'rightbarInfoKey'}>From:</span>
                        <span className={'rightbarInfoValue'}>{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className={'rightbarInfoKey'}>Relationship</span>
                        <span
                            className={'rightbarInfoValue'}>{user.relationship === 1 ? "Single" : user.relationship === 2 ? 'Married' : '-'}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend => {
                        return (
                            <Link key={friend._id} to={'/profile/' + friend.username} style={{textDecoration: 'none'}}>
                                <div className="rightbarFollowing">
                                    <img className={'rightbarFollowingImg'}
                                         src={friend.profilePicture ? PF + friend.profilePicture : `${PF}person/noAvatar`}
                                         alt="img"/>
                                    <span className={'rightbarFollowingName'}>{friend.username}</span>
                                </div>
                            </Link>)
                    })}
                </div>
            </>
        }

        return (
            <div className={'rightbar'}>
                <div className="rightbarWrapper">
                    {user ? <ProfileRightbar/> : <HomeRightbar/>}
                </div>
            </div>
        );
    }
;

export default Rightbar;