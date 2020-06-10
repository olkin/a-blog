import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import userContext from "./userContext";

function Header(props) {
    const userInfo = useContext(userContext);

    const handleLogout = () => {
        axios.delete('http://localhost:3000/logout',
            {withCredentials: true}
        ).then(() => {
            props.handleLogout()
        }).catch(error => {
            console.log('logout error', error)
        })
    }

    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {userInfo.user.email
                    ? <li><Link to="/" onClick={handleLogout}>Sign out</Link></li>
                    : <>
                        <li><Link to='/sign_in'>Sign in</Link></li>
                        <li><Link to='/sign_up'>Sign up</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Header;