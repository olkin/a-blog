import React, {useState} from 'react';
import Registration from "./auth/Registration";

function Home(props) {
    const handleSuccessfulAuth = (data) => {
        props.handleLogin(data);
        props.history.push('/dashboard');
    }

    return (
      <div>
          <h1>Home</h1>
          <h2>Status:{props.loggedInStatus}</h2>
          <Registration
              handleSuccessfulAuth={handleSuccessfulAuth}
          />
      </div>
    );
}

export default Home;