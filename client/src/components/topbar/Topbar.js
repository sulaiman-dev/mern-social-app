import { useContext } from 'react';
import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Topbar = () => {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className="topbar-container">
            <div className="topbar-left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">Social App</span>
                </Link>
            </div>
            <div className="topbar-center">
                <div className="search-bar">
                    <Search className="search-icon"/>
                    <input placeholder="Search for friend, post or video" type="text" className="search-input" />
                </div>
            </div>
            <div className="topbar-right">
                <div className="topbar-links">
                    <span className="topbar-link">Homepage</span>
                    <span className="topbar-link">Timeline</span>
                </div>
                <div className="topbar-icons">
                <div className="topbar-icon-item">
                        <Person/>
                        <span className="topbar-icon-badge">1</span>
                    </div><div className="topbar-icon-item">
                        <Chat/>
                        <span className="topbar-icon-badge">2</span>
                    </div><div className="topbar-icon-item">
                        <Notifications/>
                        <span className="topbar-icon-badge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img 
                    src={user.profilePicture ? 
                        PF + user.profilePicture : PF + "person/no-avatar.png"
                    } 
                    alt="user profile image" 
                    className="topbar-img" />
                </Link>
            </div>
        </div>
    )
}

export default Topbar
