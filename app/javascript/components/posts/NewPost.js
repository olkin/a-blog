import React from "react";
import PostForm from "./PostForm";
import axios from "axios";

function NewPost(props) {
    const postsUrl = '/api/v1/posts';
    const onSubmit = (post) => {
        const {title, body} = post;

        if (body.length === 0)
            return;

        const jsonBody = {
            title,
            body
        };

        axios.post(
            postsUrl,
            {post: jsonBody},
            {withCredentials: true}
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("create error", error)
        })
    }

    return (
        <div>
            <h1>Add new Post</h1>
            <PostForm
                onFormSubmit={onSubmit}
            />
        </div>
    );
}

export default NewPost;