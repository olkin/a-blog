import React from "react";

function Post({post}) {
    return (
        <div>
            <h3>{post.title || '...'}</h3>
            <div>by {post.user_id}</div>
            <div>
                {post.body}
            </div>
        </div>
    );
}

export default Post;