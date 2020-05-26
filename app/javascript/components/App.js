import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Dashboard from "./Dashboard";

const App = () => {
    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [user, setUser] = useState({});

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

