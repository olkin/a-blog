import React, {useState, useEffect, createContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import userContext from "./userContext";
import Footer from "./Footer";
import Main from "./Main";
import Hero from "./Hero";

function App() {
    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [user, setUser] = useState({});

    const history = useHistory();

    const checkLoginStatus = () => {
        axios.get('/logged_in',
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

    return (
        <userContext.Provider value={{user: user}}>
            <Header handleLogout={handleLogout}/>
            <Hero />
            <Main handleLogin={handleLogin}/>
            <Footer />
        </userContext.Provider>
    );
}

export default App;

