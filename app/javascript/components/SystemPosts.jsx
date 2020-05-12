import React from "react";
import Post from './Post';

function NoPosts() {
    return   <>
        <h1>Welcome, welcome.</h1>
        Nothing exciting happened yet. Check back soon!
        </>;
}

function AllPosts(props) {
    return (
        <>
            <h2>Recent posts</h2>
            {props.posts.map((post) =>
                <Post key={post.id}
                      id={post.id}
                      body={post.body}
                      title={post.title}
                      onPostDeleted={props.onPostDeleted}
                      />
            )}
        </>
    );
}

// This is super same as Posts.jsx
class SystemPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.onPostDeleted = this.onPostDeleted.bind(this);
    }

    onPostDeleted = (post_id) => {
        const newPosts = this.state.posts.filter(post => post.id !== post_id);
        this.setState({posts: newPosts});
    };

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
                    ? <AllPosts
                        posts={posts}
                        onPostDeleted={this.onPostDeleted}
                    />
                    : <NoPosts />}
            </>
        )
    }
}
export default SystemPosts;