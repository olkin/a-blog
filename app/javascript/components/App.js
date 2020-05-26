import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from 'axios';

const App = () => {
    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [user, setUser] = useState({});

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
    }

    return (
        <div className='app'>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path={'/'}
                        render={props => (
                            <Home {...props}
                                  handleLogin={handleLogin}
                                  loggedInStatus={loggedInStatus} />
                        )}
                    />
                    <Route
                        exact
                        path={'/dashboard'}
                        render={props => (
                            <Dashboard {...props} loggedInStatus={loggedInStatus} />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

