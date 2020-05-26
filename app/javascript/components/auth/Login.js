import React, {useState} from 'react';
import axios from 'axios';

const Login = (props) => {
    const [formData, setFormData] = useState({email: '', password: ''});
    //const [loginErrors, setLoginErrors] = useState('');

    const handleSubmit = (event) => {
        axios.post(
            'http://localhost:3000/sessions',
            {user: formData},
            {withCredentials: true}
        ).then(response => {
            if (response.data.logged_in) {
                props.handleSuccessfulAuth(response.data);
            }
        }).catch(error => {
            console.log("login error", error)
        })

        event.preventDefault();
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
        event.preventDefault();
    }

    return (
        <div>
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

                <button type='submit' className="button">Login</button>
            </form>
        </div>
    );
}

export default Login;