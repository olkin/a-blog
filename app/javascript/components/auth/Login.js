import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Login(props) {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [loginErrors, setLoginErrors] = useState('');

    const handleSubmit = (event) => {
        axios.post(
            '/sessions',
            {user: formData},
            {withCredentials: true}
        ).then(response => {
            if (response.data.logged_in) {
                props.handleSuccessfulAuth(response.data);
            }
        }).catch(error => {
            console.log("login error", error)
            setLoginErrors('Email or password didn not match');
        })
        event.preventDefault();
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
        event.preventDefault();
    }

    return (
        <div>
            <h1>Sign in</h1>
            { loginErrors.length > 0
                ? <div>{loginErrors}</div>
                : <></>
            }

            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type='submit' className="button">Sign in</button>
            </form>
            <Link to='/sign_up'>Sign up</Link>
        </div>
    );
}

export default Login;