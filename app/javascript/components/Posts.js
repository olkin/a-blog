import React, {useEffect, useState} from 'react';
import axios from "axios";
import Post from "./Post";

function Posts() {
    const [posts, setPosts] = useState([]);

    const loadPosts = () => {
        axios.get('http://localhost:3000/api/v1/posts',
            {withCredentials: true}
        ).then(response => {
            setPosts(response.data.posts);
        }).catch(error => {
            console.log("posts error", error)
        })
    }

    useEffect(loadPosts, []);

    return (
        <div>
        {posts.length > 0
            ?  posts.map(post => <Post post={post} key={post.id} />)
            : 'No posts yet'
        }
        </div>

    );
}

export default Posts;