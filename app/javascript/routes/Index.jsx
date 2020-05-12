import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from "../components/posts/Posts";
import NewPost from "../components/posts/NewPost";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/posts/new" exact component={NewPost} />
        </Switch>
    </Router>
);