import React, {useContext} from "react"
import {Link} from "react-router-dom";
import axios from "axios";
import userContext from "../userContext";

function Post(props) {
    const {id, title, body, user_id} = props.post;
    const userInfo = useContext(userContext);

    const urls = {
        destroy: `/api/v1/posts/${id}`,
        edit: `/posts/${id}/edit`
    }

    const deletePost = () => {
        //const token = document.querySelector('meta[name="csrf-token"]').content;
        axios.delete(
            urls.destroy,
            {withCredentials: true}
        ).then(() => {
            props.onPostDeleted(id);
        }).catch(error => {
            console.log("login error", error)
        })
    }

    const canUpdate = () => userInfo.user.id === user_id;

    return (
        <div className="post">
            <h3>{title}</h3>
            <p>
                {body}
            </p>
            { canUpdate()
                ?   <p>
                    <Link to={urls.edit}>
                        Edit
                    </Link>

                    <a onClick={deletePost}>
                        Delete
                    </a>
                </p>
                : <></>
            }

        </div>
    );
}

export default Post;