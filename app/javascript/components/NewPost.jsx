import React from "react";
import { Link } from "react-router-dom";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            // kind: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/posts";
        const { title, body } = this.state;

        if (body.length == 0)
            return;

        const jsonBody = {
            title,
            body
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/posts`))
            .catch(error => console.log(error.message));
    }

    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    render() {
        return (
            <div>
                <h1>Add new Post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="postTitle">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="postTitle"
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="postBody">Body</label>
                        <input
                            type="text"
                            name="body"
                            id="postBody"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="button">
                        Create Post
                    </button>
                    <Link to="/posts">
                        Back to posts
                    </Link>
                </form>
            </div>
        );
    }
}

export default NewPost;