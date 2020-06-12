import React, {useContext} from 'react';
import Posts from "./posts/Posts";
import {Link} from "react-router-dom";
import userContext from "./userContext";

function Home() {
    const userInfo = useContext(userContext);

    return (
        <div className="grid-x">
            <div className="cell large-8">
                {userInfo.user.email
                    ?
                    <Link to="/posts/new" className="button">
                        New Post
                    </Link>
                    : <></>
                }

                <Posts/>
            </div>
            <div className="cell large-4">
            </div>
        </div>
    );
}

export default Home;