import React, {useState} from "react";
import PostForm from "./PostForm";

function NewPost(props) {
    const [state, setState] = useState({ title: '', body: ''});

    const onChange = (e) =>
        setState({ ...state, [e.target.name]: e.target.value });

    const postsUrl = '/api/v1/posts';
    const onSubmit = (e) => {
        e.preventDefault();
        const { title, body } = state;

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
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default NewPost;