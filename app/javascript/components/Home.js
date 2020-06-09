import React from 'react';
import Posts from "./posts/Posts";
import {Link} from "react-router-dom";

function Home() {
    return (
      <div>

          <h1>Welcome</h1>
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