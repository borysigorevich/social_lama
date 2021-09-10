import React, {useContext, useEffect, useState} from 'react';
import './feed.css'
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
// import {Posts} from '../../dummyData'

const Feed = ({username}) => {
    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(`/posts/profile/${username}`)
                : await axios.get('/posts/timeline/' + user._id)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [username, user._id])

    return (
        <div className={'feed'}>
            <div className="feedWrapper">
                {username === user.username && <Share/>}
                {posts.map(post => {
                    return <Post key={post._id} post={post}/>
                })}
            </div>
        </div>
    );
};

export default Feed;