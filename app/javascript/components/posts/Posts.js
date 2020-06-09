import React, {useEffect, useState} from 'react';
import axios from "axios";
import Post from "./Post";

function PostsList({posts, onPostDeleted}) {
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
    const [postsState, setPostsState] = useState({posts: [], loading: null});

    const loadPosts = () => {
        axios.get('http://localhost:3000/api/v1/posts',
            {withCredentials: true}
        ).then(response => {
            setPostsState({loading: false, posts: response.data});
        }).catch(error => {
            console.log("posts error", error)
        })
    }

    useEffect(() => {
        setPostsState({...postsState, loading: true});
        loadPosts();
        }, [setPostsState]);

    const onPostDeleted = (post_id) => {
        const newPosts = postsState.posts.filter(post => post.id !== post_id);
        setPostsState({...postsState, posts: newPosts});
    };

    if (postsState.loading == null || postsState.loading) return <>Loading...</>;
    if (postsState.posts.length === 0) return <>No public posts</>;
    return <PostsList posts={postsState.posts} onPostDeleted={onPostDeleted}/>;
}

export default Posts;