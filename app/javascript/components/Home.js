import React, {useContext} from 'react';
import Posts from "./posts/Posts";
import {Link} from "react-router-dom";
import userContext from "./userContext";

function Home() {
    const userInfo = useContext(userContext);

    return (
      <div>
          <h1>Welcome, {userInfo.user.email || 'Guest'} </h1>
          <div>
                   <Link to="/posts/new">
                       Create New Post
                   </Link>
               </div>
          <Posts />
      </div>
    );
}

export default Home;