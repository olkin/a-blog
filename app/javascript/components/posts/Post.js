import React from "react"
import {Link} from "react-router-dom";
import axios from "axios";

function Post(props) {
    const {id, title, body} = props.post;

    const urls = {
        destroy: `/api/v1/posts/${id}`,
        edit: `/posts/${id}/edit`
    }

    const deletePost = () => {
        //const token = document.querySelector('meta[name="csrf-token"]').content;
        axios.delete(
            urls.destroy,
            {withCredentials: true}
        ).then(() => {
            props.onPostDeleted(id);
        }).catch(error => {
            console.log("login error", error)
        })
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