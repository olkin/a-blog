import React, {useState, useEffect} from "react";
import PostForm from "./PostForm";

function EditPost(props) {
    const [post, setPost] = useState(null);
    const postUrl = `/api/v1/posts/${props.match.params.id}`;
    const postsUrl = '/api/v1/posts';

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
            .then(() => props.history.push(`/posts`))
            .catch(error => console.log(error.message));
    }


// stripHtmlEntities(str) {
//     return String(str)
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;");
// }

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