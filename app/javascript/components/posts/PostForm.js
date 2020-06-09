import React, {useState} from "react";
import {Link} from "react-router-dom";

function PostForm({onFormSubmit, post}) {
    const [state, setState] = useState({ title: post?.title, body: post?.body});

    const onChange = (e) =>
        setState({ ...state, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(state);
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="postTitle">Title</label>
                <input
                    type="text"
                    name="title"
                    id="postTitle"
                    onChange={onChange}
                    value={state.title || ''}
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
                    value={state.body}
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