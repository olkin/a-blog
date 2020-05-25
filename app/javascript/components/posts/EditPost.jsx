import React from "react";
import PostForm from "./PostForm";

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: null }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    componentDidMount() {
        const url = `/api/v1/posts/${this.props.id}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ post: response }))
        // .catch(() => this.props.history.push("/"));
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/posts";
        const { title, body } = this.state;

        if (body.length === 0)
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
                <h1>Edit Post</h1>
                <PostForm
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    post={this.state.post}
                />
            </div>
        );
    }
}

export default EditPost;