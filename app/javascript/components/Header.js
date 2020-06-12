import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import userContext from "./userContext";
import '../styles/Header.scss';
import '../styles/GlobalStyles.scss';

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
        <>
            <div className="title-bar show-for-small-only">
                <div className="title-bar-left">
                    <button className="menu-icon" type="button" data-open="mobile-menu"></button>
                    <span className="title-bar-title">MENU</span>
                </div>
            </div>
            <div className="top-bar nav-desktop show-for-medium">
                <div className="wrap">
                    <div className="top-bar-left">
                        <h3 className="site-logo"><Link to='/'>Match Point</Link></h3>
                    </div>
                    <div className="top-bar-right">
                        <ul className="menu menu-desktop">
                            {userInfo.user.email
                                ?
                                <>
                                    {/*<li> Welcome, {userInfo.user.email} </li>*/}
                                    <li><Link to="/" onClick={handleLogout}>Sign out</Link></li>
                                </>
                                : <>
                                    <li><Link to='/sign_in'>Sign in</Link></li>
                                    <li><Link to='/sign_up'>Sign up</Link></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;