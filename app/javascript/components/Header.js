import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import userContext from "./userContext";
import '../styles/Header.scss'
import '../styles/AppStyles.scss'

function Header(props) {
    const userInfo = useContext(userContext);

    const handleLogout = () => {
        axios.delete('/logout',
            {withCredentials: true}
        ).then(() => {
            props.handleLogout()
        }).catch(error => {
            console.log('logout error', error)
        })
    }

    return (
        <div className="top-bar">
            <div className="wrap">
                <div className="top-bar-left">
                    <h3><Link to='/'>Home</Link></h3>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        {userInfo.user.email
                            ? <li><Link to="/" onClick={handleLogout}>Sign out</Link></li>
                            : <>
                                <li><Link to='/sign_in'>Sign in</Link></li>
                                <li><Link to='/sign_up'>Sign up</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;