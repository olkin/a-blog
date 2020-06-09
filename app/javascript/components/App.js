import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import AppRoutes from "../routes/AppRoutes";

const App = () => {
    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [user, setUser] = useState({});

    const history = useHistory();

    const checkLoginStatus = () => {
        axios.get('http://localhost:3000/logged_in',
            {withCredentials: true}
        ).then(response => {
            if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
                setLoggedInStatus('LOGGED_IN');
                setUser(response.data.user);
            } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
                setLoggedInStatus('NOT_LOGGED_IN');
                setUser({});
            }
        }).catch(error => {
            console.log("login error", error)
        })
    }

    useEffect(checkLoginStatus, []);

    const handleLogin = (data) => {
        setLoggedInStatus('LOGGED_IN');
        setUser(data.user);
        history.push('/');
    }

    const handleLogout = () => {
        setLoggedInStatus('NOT_LOGGED_IN');
        setUser({});
        history.push('/');
    }

    return <AppRoutes
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        user={user}
        loggedInStatus={loggedInStatus}
    />
}

export default App;

