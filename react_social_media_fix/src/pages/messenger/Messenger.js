import React, {useContext, useEffect, useRef, useState} from 'react';
import './messenger.css'
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {io} from 'socket.io-client'

const Messenger = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const {user} = useContext(AuthContext)
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => {
            return [...prev, arrivalMessage]
        })
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current?.emit('addUser', user._id)
        socket.current?.on('getUsers', users => {
            setOnlineUsers(users)
        })
    }, [user])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get('/conversations/' + user._id)
                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('/messages/' + currentChat?._id)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        // e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage
        })
        try {
            const res = await axios.post('/messages', message)
            setMessages(prev => {
                return [...prev, res.data]
            })
            setNewMessage('')
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    // console.log(messages)

    return (
        <>
            <Topbar/>
            <div className={'messenger'}>
                <div className={'chatMenu'}>
                    <div className="chatMenuWrapper">
                        <input placeholder={'Search for friends'} className={'chatMenuInput'}/>
                        {conversations.map(c => {
                            return <div
                                onClick={() => setCurrentChat(c)}
                                key={c._id}>
                                <Conversation
                                    conversation={c}
                                    currentUser={user}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className={'chatBox'}>
                    <div className="chatBoxWrapper">
                        {currentChat
                            ? <>
                                <div className="chatBoxTop">
                                    {messages.map(m => (
                                        <div ref={scrollRef}><Message message={m} own={m.sender === user._id}/></div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className={'chatMessageInput'} placeholder={'write something'}
                                              onChange={e => setNewMessage(e.target.value)} value={newMessage}/>
                                    <button className={'chatSubmitButton'}
                                            onClick={handleSubmit}>Send
                                    </button>

                                </div>
                            </>
                            : <span className={'noConversation'}>Open a conversation to open a chat</span>}
                    </div>
                </div>
                <div className={'chatOnline'}>
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers}
                                    currentId={user._id}
                                    setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default Messenger;