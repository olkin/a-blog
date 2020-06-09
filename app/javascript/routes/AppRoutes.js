import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import NewPost from "../components/posts/NewPost";
import EditPost from "../components/posts/EditPost";

function AppRoutes(routeProps) {
    const userSignedIn = () => routeProps.loggedInStatus === 'LOGGED_IN';

    return (
        <BrowserRouter>
            <Header userSignedIn={userSignedIn()} handleLogout={routeProps.handleLogout} user={routeProps.user}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact
                       path='/sign_in'
                       render={props => (
                           <Login {...props}
                                  handleSuccessfulAuth={routeProps.handleLogin}
                           />
                       )}
                />
                <Route exact path='/sign_up' render={props => (
                    <Registration {...props}
                                  handleSuccessfulAuth={routeProps.handleLogin}
                    />
                )}/>
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/new" exact component={NewPost} />
                <Route path="/posts/:id/edit" exact component={EditPost} />
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;