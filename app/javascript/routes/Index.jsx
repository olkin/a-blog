import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SystemPosts from "../components/SystemPosts";
import NewPost from "../components/NewPost";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={SystemPosts} />
            <Route path="/posts" exact component={SystemPosts} />
            <Route path="/posts/new" exact component={NewPost} />
        </Switch>
    </Router>
);