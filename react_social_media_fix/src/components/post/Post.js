import React, {useContext, useEffect, useState} from 'react';
import './post.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import {format} from 'timeago.js'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
// import {Users} from '../../dummyData'

const Post = ({post}) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user: currentUser} = useContext(AuthContext)

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put('/posts/' + post._id + '/like', {userId: currentUser._id})
        } catch (error) {

        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className={'post'}>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : `${PF}person/noAvatar.png`}
                                 alt="img"
                                 className={'postProfileImg'}/>
                            <span className={'postUsername'}>{user.username}</span>
                        </Link>
                        <span className={'postDate'}>{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className={'postImg'} src={post.img ? PF + post.img : `${PF}person/noCover.png`}
                         alt=" img"/>
                </div>
                <div className=" postBottom">
                    <div className=" postBottomLeft">
                        <img className={'likeIcon'}
                             onClick={likeHandler}
                             src={`${PF}like.png`}
                             alt=" img"/>
                        <img className={'likeIcon'}
                             onClick={likeHandler}
                             src={`${PF}heart.png`}
                             alt=" img"/>
                        <span className=" postLikeCounter">{like} people like it</span>
                    </div>
                    <div className=" postBottomRight">
                        <span className=" postCommentText">{post.comment}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;