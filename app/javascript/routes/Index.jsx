import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from "../components/posts/Posts";
import NewPost from "../components/posts/NewPost";
import EditPost from "../components/posts/EditPost";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/posts/new" exact component={NewPost} />
            <Route path="/posts/:id/edit" exact component={EditPost} />
        </Switch>
    </Router>
);