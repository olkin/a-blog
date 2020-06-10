import React from 'react';
import '../styles/AppStyles.scss'
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import NewPost from "./posts/NewPost";
import EditPost from "./posts/EditPost";

function Main(props) {
    return (
        <section className="main">
            <div className="wrap">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact
                           path='/sign_in'
                           render={props => (
                               <Login {...props}
                                      handleSuccessfulAuth={props.handleLogin}
                               />
                           )}
                    />
                    <Route exact path='/sign_up' render={props => (
                        <Registration {...props}
                                      handleSuccessfulAuth={props.handleLogin}
                        />
                    )}/>
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/new" exact component={NewPost} />
                    <Route path="/posts/:id/edit" exact component={EditPost} />
                </Switch>
            </div>
        </section>
    )
}

export default Main;