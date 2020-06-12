import React, {useContext} from "react"
import {Link} from "react-router-dom";
import axios from "axios";
import userContext from "../userContext";
import '../../styles/Post.scss'

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
        <div className="card">
            <div className="card-divider">
                <h4 className="card-title">
                    {title}
                </h4>
                {canUpdate()
                    ? <div className='available-actions'>
                        <span>
                            <Link to={urls.edit}>
                                <i className="fa fa-edit" />
                        </Link>
                        </span>
                        <span>
                        <a onClick={deletePost}>
                             <i className="fa fa-trash" />
                        </a>
                        </span>
                    </div>

                    : <></>
                }
            </div>
            <div className="card-section">
                <p>
                    {body}
                </p>
            </div>
        </div>
    );
}

export default Post;