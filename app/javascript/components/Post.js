import React from "react"
import PropTypes from "prop-types"

class Post extends React.Component {
    render () {
        return (
            <div class="post">
                <h3>{this.props.title}</h3>
                <p>
                    {this.props.body}
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