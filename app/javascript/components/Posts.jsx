import React from "react";
import Post from './Post';

function NoPosts() {
    return <>No posts yet</>;
}

function AllPosts(props) {
    return (
        <>
            <h2>Newsfeed</h2>
            {props.posts.map((post) =>
                <Post key={post.id} body={post.body} title={post.title}/>
            )}
        </>
    );
}

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        const url = "/api/v1/posts";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ posts: response }))
            // .catch(() => this.props.history.push("/"));
    }

    render() {
        const { posts } = this.state;
        return(
            <>
                {posts.length > 0
                    ? <AllPosts posts={posts}/>
                    : <NoPosts />}
            </>
        )
    }
}
export default Posts;