import React, {useContext} from 'react'
import './Home.css'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {AuthContext} from "../../context/AuthContext";

const Home = () => {
    // const {user} = useContext(AuthContext)

    return (
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar user={{}}/>
            </div>
        </>
    );
};

export default Home;