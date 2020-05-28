import React from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

function Header(props) {
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
                {props.userSignedIn && props.user
                    ? <li>Welcome, {props.user.email}</li>
                    : <></>
                }
                {props.userSignedIn
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