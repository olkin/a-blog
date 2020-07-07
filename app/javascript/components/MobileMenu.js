import React, {useContext} from 'react';
import userContext from "./userContext";
import axios from "axios";
import {Link} from "react-router-dom";

function MobileMenu(props) {
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
        <ul>
            <li><Link to="/">Events</Link></li>
            {userInfo.user.email
                ?
                <>
                    <li><Link to="/" onClick={handleLogout}>Sign out</Link></li>
                </>
                : <>
                    <li><Link to='/sign_in'>Sign in</Link></li>
                    <li><Link to='/sign_up'>Sign up</Link></li>
                </>
            }
        </ul>
    )
}

export default MobileMenu;