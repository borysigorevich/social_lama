import React, {useEffect, useState} from 'react';
import './conversation.css'
import axios from "axios";

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const friendId = conversation.members.find(m => {
            return m !== currentUser._id
        })
        const getUser = async () => {
            try {
                const res = await axios.get('/users?userId=' + friendId)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getUser()
    }, [conversation, currentUser])

    return (
        <div className={'conversation'}>
            <img className={'conversationImg'}
                 src={user?.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                 alt="img"/>
            <span className={'conversationName'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Conversation;