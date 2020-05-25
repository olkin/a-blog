import React, { useState, useEffect } from "react";
import Post from './Post';
import { Link } from "react-router-dom";

function NoPosts() {
    return (
    <>
        <h1>Welcome, welcome.</h1>
        Nothing exciting happened yet. Check back soon!
    </>);
}

function AllPosts({posts, onPostDeleted}) {
    return (
        <>
            <h2>Recent posts</h2>
            {posts.map((post) =>
                <Post key={post.id}
                      id={post.id}
                      body={post.body}
                      title={post.title}
                      onPostDeleted={onPostDeleted}
                />
            )}
        </>
    );
}

// This is super same as Posts.jsx
function Posts() {
    const [posts, setPosts] = useState([]);

    const onPostDeleted = (post_id) => {
        const newPosts = posts.filter(post => post.id !== post_id);
        setPosts(newPosts);
    };

    useEffect(() => {
        const url = "/api/v1/posts";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setPosts(response))
        // .catch(() => this.props.history.push("/"));
    }, []);

    return (
        <>
            <Link to="/posts/new">
                Create New Post
            </Link>
            {posts.length > 0
                ? <AllPosts
                    posts={posts}
                    onPostDeleted={onPostDeleted}
                />
                : <NoPosts/>
            }
        </>
    );
}
export default Posts;