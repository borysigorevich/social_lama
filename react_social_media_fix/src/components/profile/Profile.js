import React, {useEffect, useState} from 'react';
import './profile.css'
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import axios from "axios";
import {useParams} from "react-router";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const {username} = useParams()


        useEffect(() => {
            // console.log('are we here')
            const fetchUser = async () => {
                const res = await axios.get(`/users?username=${username}`)
                setUser(res.data)
            }
            fetchUser()
        }, [username])

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF + user.coverPicture : `${PF}person/noCover.png`} alt="img"
                                 className={'profileCoverImg'}/>
                            <img src={user.profilePicture ? PF + user.profilePicture : `${PF}person/noAvatar.png`}
                                 alt="img" className={'profileUserImg'}/>
                        </div>
                        <div className="profileInfo">
                            <h4 className={'profileInfoName'}>{user.username}</h4>
                            <span className={'profileInfoDesc'}>{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;