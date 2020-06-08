import React from "react"
import {Link} from "react-router-dom";

function Post(props) {
    const {id, title, body} = props.post;

    const urls = {
        destroy: `/api/v1/posts/${id}`,
        edit: `/posts/${id}/edit`
    }

    const deletePost = () => {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(urls.destroy, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(() => props.onPostDeleted(id))
            .catch(error => console.log(error.message));
    }

    return (
        <div className="post">
            <h3>{title}</h3>
            <p>
                {body}
            </p>
            <p>
                <Link to={urls.edit}>
                    Edit
                </Link>

                <a onClick={deletePost}>
                    Delete
                </a>
            </p>
        </div>
    );
}

export default Post;