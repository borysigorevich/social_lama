import React, {useEffect, useState} from 'react';
import './chatOnline.css'
import axios from "axios";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
    const onlineUsersArr = onlineUsers.map(onlineUser => {
        return onlineUser.userId
    })
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get('/users/friends/' + currentId)
                setFriends(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(friend => {
            return onlineUsersArr.includes(friend._id)
        }))
    }, [onlineUsers, friends])

    const handleClick = async (user) => {
        console.log({user})
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={'chatOnline'}>
            {onlineFriends.map(online => (
                <div className={'chatOnlineFriend'} onClick={() => {
                    handleClick(online)
                }}>
                    <div className={'chatOnlineImgContainer'}>
                        <img className={'chatOnlineImg'}
                             src={online.profilePicture ? PF + online.profilePicture : 'assets/person/noAvatar.jpeg'}
                             alt="img"/>
                        <div className={'chatOnlineBadge'}>
                        </div>
                    </div>
                    <span className="chatOnlineName">{online.username}</span>
                </div>
            ))}
        </div>
    );
};

export default ChatOnline;