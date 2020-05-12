import React from "react";
import {Link} from "react-router-dom";

function PostForm({onChange, onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="postTitle">Title</label>
                <input
                    type="text"
                    name="title"
                    id="postTitle"
                    onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="postBody">Body</label>
                <input
                    type="text"
                    name="body"
                    id="postBody"
                    required
                    onChange={onChange}
                />
            </div>
            <button type="submit" className="button">
                Create Post
            </button>
            <Link to="/posts">
                Back to posts
            </Link>
        </form>
    );
}

export default PostForm;