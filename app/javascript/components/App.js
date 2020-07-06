import React, {useState, useEffect, createContext} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import userContext from "./userContext";
import Footer from "./Footer";
import Main from "./Main";
import Hero from "./Hero";
import MobileMenu from "./MobileMenu";
import '../styles/App.scss'

function App() {
    const [user, setUser] = useState({});

    const history = useHistory();

    const checkLoginStatus = () => {
        axios.get('/logged_in',
            {withCredentials: true}
        ).then(response => {
            if (response.data.logged_in && !isLoggedIn() ) {
                setUser(response.data.user);
            } else if (!response.data.logged_in && isLoggedIn()) {
                setUser({});
            }
        }).catch(error => {
            console.log("login error", error)
        })
    }

    useEffect(checkLoginStatus, []);

    const handleLogin = (data) => {
        setUser(data.user);
        history.push('/');
    }

    const handleLogout = () => {
        setUser({});
        history.push('/');
    }

    const isLoggedIn = () => user.email?.length > 0;

    return (
        <div className="off-canvas-wrapper">
            <div className="off-canvas position-left" id="mobile-menu" data-off-canvas>
                <MobileMenu />
            </div>
            <div className="off-canvas-content" data-off-canvas-content>
                <userContext.Provider value={{user: user}}>
                    <Header handleLogout={handleLogout}/>
                    {/*{ isLoggedIn()*/}
                    {/*    ? <></>*/}
                    {/*    :*/}
                    {/*    <Switch>*/}
                    {/*        <Route exact path='/' component={Hero}/>*/}
                    {/*    </Switch>*/}
                    {/*}*/}
                    <Main handleLogin={handleLogin}/>
                    <Footer />
                </userContext.Provider>
            </div>
        </div>
    );
}

export default App;

