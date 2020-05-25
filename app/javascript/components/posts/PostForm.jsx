import React from "react";
import {Link} from "react-router-dom";

function PostForm({onChange, onSubmit, post}) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="postTitle">Title</label>
                <input
                    type="text"
                    name="title"
                    id="postTitle"
                    onChange={onChange}
                    value={post?.title}
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
                    value={post?.body}
                />
            </div>
            <button type="submit" className="button">
                Save
            </button>
            <Link to="/posts">
                Back to posts
            </Link>
        </form>
    );
}

export default PostForm;