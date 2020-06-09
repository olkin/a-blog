import React, {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Registration(props) {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [registrationErrors, setRegistrationErrors] = useState('');

    const handleSubmit = (event) => {
        axios.post(
            'http://localhost:3000/registrations',
            {user: formData},
            {withCredentials: true}
        ).then(response => {
            if (response.data.status === 'created') {
                props.handleSuccessfulAuth(response.data);
            }
        }).catch(error => {
            console.log("registration error", error)
            setRegistrationErrors('Account already registered');
        })

        event.preventDefault();
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
        event.preventDefault();
    }

    return (
      <div>
          <h1>Sign up</h1>
          { registrationErrors.length > 0
              ? <div>{registrationErrors}</div>
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

              <button type='submit' className="button">Register</button>
          </form>
          <Link to='/sign_in'>Sign in</Link>
      </div>
    );
}

export default Registration;