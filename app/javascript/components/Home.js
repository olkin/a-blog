import React from 'react';
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from 'axios';

function Home(props) {
    const handleSuccessfulAuth = (data) => {
        props.handleLogin(data);
        props.history.push('/dashboard');
    }

    const handleLogout = () => {
        axios.delete('http://localhost:3000/logout',
            {withCredentials: true}
        ).then(() => {
            props.handleLogout()
        }).catch(error => {
            console.log('logout error', error)
        })
    }

    return (
      <div>
          <h1>Home</h1>
          <h2>Status:{props.loggedInStatus}</h2>
          <button onClick={handleLogout} className="button">Logout</button>
          <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
          <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      </div>
    );
}

export default Home;