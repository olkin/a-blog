import React from 'react';
import '../styles/GlobalStyles.scss'
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Actions from "./Actions";
import NewEvent from "./events/NewEvent";
import EditEvent from "./events/EditEvent";
import '../styles/Main.scss'
import NewEventRegistration from "./regitrations/NewEventRegistration";
import EventDetails from "./events/EventDetails";

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

                            <Route path="/events/new" exact component={NewEvent}/>
                            <Route path="/events/:id/edit" exact component={EditEvent}/>
                            <Route path="/events/:id/register" exact component={NewEventRegistration}/>
                        </Switch>
                    </div>
                    <div className="cell large-4">
                        <Actions />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;