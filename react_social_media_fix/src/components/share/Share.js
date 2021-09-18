import React, {useContext, useRef, useState} from 'react';
import './share.css'
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LabelIcon from '@material-ui/icons/Label';
import RoomIcon from '@material-ui/icons/Room';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import {Cancel} from '@material-ui/icons';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const Share = () => {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append('name', fileName)
            data.append('file', file)
            newPost.img = fileName
            try {
                await axios.post('/upload', data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post('/posts', newPost)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'share'}>
            <div className="shareWrapper">
                <div className={'shareTop'}>
                    <img className={'shareProfileImg'}
                         src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt=""/>
                    <input ref={desc} placeholder={`What\'s in your mind ${user.username}?`} className={'shareInput'}/>
                </div>
                <hr className={'shareHr'}/>
                {file && (
                    <div className={'shareImgContainer'}>
                        <img src={URL.createObjectURL(file)} alt="img" className={'shareImg'}/>
                        <Cancel className={'shareCancelImg'} onClick={() => {
                            setFile(null)
                        }
                        }/>
                    </div>
                )}
                <form className={'shareBottom'} onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor={'file'} className="shareOption">
                            <PermMediaIcon htmlColor={'tomato'} className={'shareIcon'}/>
                            <span className={'shareOptionText'}>Photo or Video</span>
                            <input style={{display: 'none'}} type="file" id={'file'} accept={'.png, .jpeg, .jpg'}
                                   onChange={e => {
                                       setFile(e.target.files[0])
                                   }}/>
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor={'blue'} className={'shareIcon'}/>
                            <span className={'shareOptionText'}>Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon htmlColor={'green'} className={'shareIcon'}/>
                            <span className={'shareOptionText'}>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor={'goldenrod'} className={'shareIcon'}/>
                            <span className={'shareOptionText'}>Feelings</span>
                        </div>
                    </div>
                    <button className={'shareButton'} type={"submit"}>Share</button>
                </form>
            </div>
        </div>
    );
};

export default Share;