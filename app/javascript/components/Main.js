import React from 'react';
import '../styles/GlobalStyles.scss'
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Actions from "./Actions";
import NewEvent from "./events/NewEvent";
import EditEvent from "./events/EditEvent";
import NewEventRegistration from "./registrations/NewEventRegistration";
import EventActions from "./events/EventActions";
import EventTeams from "./event_teams/EventTeams";

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

                            <Route path="/events/new" exact component={NewEvent}/>
                            <Route path="/events/:id/edit" exact component={EditEvent}/>
                            <Route path="/events/:id/register" exact component={NewEventRegistration}/>
                            <Route path="/events/:id/teams" exact component={EventTeams}/>
                        </Switch>
                    </div>
                    <div className="cell large-4">
                        <Switch>
                            <Route path="/posts" exact component={Actions}/>
                            <Route path="/" exact component={Actions}/>
                            <Route path="/events/:id/edit" exact component={EventActions}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;