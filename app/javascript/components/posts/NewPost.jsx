import React from "react";
import PostForm from "./PostForm";

function NewPost(props) {
    const postsUrl = '/api/v1/posts';
    const onSubmit = (post) => {
        const { title, body } = post;

        if (body.length === 0)
            return;

        const jsonBody = {
            title,
            body
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(postsUrl, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => props.history.push(`/posts`))
            .catch(error => console.log(error.message));
    }

    // stripHtmlEntities(str) {
    //     return String(str)
    //         .replace(/</g, "&lt;")
    //         .replace(/>/g, "&gt;");
    // }

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