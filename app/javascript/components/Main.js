import React from 'react';
import '../styles/GlobalStyles.scss'
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import NewPost from "./posts/NewPost";
import EditPost from "./posts/EditPost";
import '../styles/Main.scss'

function Main(props) {
    return (
        <section className="main">
            <div className="wrap">
                <div className='grid-x'>
                    <div className="cell large-8">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact
                                   path='/sign_in'
                                   render={loginProps => (
                                       <Login {...loginProps}
                                              handleSuccessfulAuth={props.handleLogin}
                                       />
                                   )}
                            />
                            <Route exact path='/sign_up' render={registrationProps => (
                                <Registration {...registrationProps}
                                              handleSuccessfulAuth={props.handleLogin}
                                />
                            )}/>
                            <Route path="/posts" exact component={Home}/>
                            <Route path="/posts/new" exact component={NewPost}/>
                            <Route path="/posts/:id/edit" exact component={EditPost}/>
                        </Switch>
                    </div>
                    <div className="cell large-4">
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;