import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost() {
        // const url = `/api/v1/posts/${this.props.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        const url = `/api/v1/posts/${this.props.id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(() => this.props.onPostDeleted(this.props.id))
            .catch(error => console.log(error.message));
    }



    render () {
        const editUrl = `/posts/${this.props.id}/edit`;

        return (
            <div className="post">
                <h3>{this.props.title}</h3>
                <p>
                    {this.props.body}
                </p>
                <p>
                    <Link to={editUrl} >
                        Edit
                    </Link>

                    <a onClick={this.deletePost}>
                        Delete
                    </a>
                </p>
            </div>
        );
    }
}

Post.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string.isRequired
};

export default Post