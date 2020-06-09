import React, {useState, useEffect} from 'react';
import {Switch, Route, useHistory, BrowserRouter} from 'react-router-dom';
import Home from "./Home";
import axios from 'axios';
import Header from "./Header";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import EditPost from "./posts/EditPost";
import NewPost from "./posts/NewPost";

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

    const userSignedIn = () => loggedInStatus === 'LOGGED_IN';

    return (
        <BrowserRouter>
            <Header userSignedIn={userSignedIn()} handleLogout={handleLogout} user={user}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact
                       path='/sign_in'
                       render={props => (
                               <Login {...props}
                                      handleSuccessfulAuth={handleLogin}
                               />
                           )}
                />
                <Route exact path='/sign_up' render={props => (
                        <Registration {...props}
                               handleSuccessfulAuth={handleLogin}
                        />
                    )}/>
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/new" exact component={NewPost} />
                <Route path="/posts/:id/edit" exact component={EditPost} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

