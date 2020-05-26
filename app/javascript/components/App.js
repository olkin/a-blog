import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Dashboard from "./Dashboard";

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/dashboard'} component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

