import React, {useState, useEffect} from "react";
import PostForm from "./PostForm";
import axios from "axios";

function EditPost(props) {
    const [post, setPost] = useState(null);
    const postUrl = `/api/v1/posts/${props.match.params.id}`;

    useEffect(() => {
        fetch(postUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setPost(response))
        // .catch(() => this.props.history.push("/"));
    }, []);

    const onSubmit = (post) => {
        const {title, body} = post;

        if (body.length === 0)
            return;

        const jsonBody = {
            title,
            body
        };

        axios.put(
            postUrl,
            { post: jsonBody },
            { withCredentials: true }
        ).then(() => {
            props.history.push(`/`);
        }).catch(error => {
            console.log("login error", error)
        })

        //const token = document.querySelector('meta[name="csrf-token"]').content;
        //     headers: {
        //         "X-CSRF-Token": token,
        //         "Content-Type": "application/json"
        //     },
    }

    return (
        <div>
            <h1>Edit Post</h1>
            { post
                ? <PostForm
                    onFormSubmit={onSubmit}
                    post={post}
                />
                : <></>
            }
        </div>
    );
}

export default EditPost;