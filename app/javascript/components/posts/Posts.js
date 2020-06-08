import React, {useEffect, useState} from 'react';
import axios from "axios";
import Post from "./Post";

function NoPosts() {
    return (
        <>
            Nothing exciting happened yet. Check back soon!
        </>);
}

function AllPosts({posts, onPostDeleted}) {
    return (
        <>
            <h2>Recent posts</h2>
            {posts.map((post) =>
                <Post key={post.id}
                      post={post}
                      onPostDeleted={onPostDeleted}
                />
            )}
        </>
    );
}

function Posts() {
    const [posts, setPosts] = useState([]);

    const loadPosts = () => {
        axios.get('http://localhost:3000/api/v1/posts',
            {withCredentials: true}
        ).then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.log("posts error", error)
        })
    }

    useEffect(loadPosts, []);

    const onPostDeleted = (post_id) => {
        const newPosts = posts.filter(post => post.id !== post_id);
        setPosts(newPosts);
    };

    return (
        <>
        {posts.length > 0
            ?
            <AllPosts
                posts={posts}
                onPostDeleted={onPostDeleted}
            />
            : <NoPosts />
        }
        </>

    );
}

export default Posts;