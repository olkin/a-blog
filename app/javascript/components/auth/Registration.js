import React, {useState} from 'react';
import axios from 'axios';

const Registration = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    //const [registrationErrors, setRegistrationErrors] = useState('');

    const handleSubmit = (event) => {
        axios.post(
            'http://localhost:3000/registrations',
            {user: formData},
            {withCredentials: true}
        ).then(response => {
            console.log("registration response", response)
        }).catch(error => {
            console.log("registration error", error)
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

              <button type='submit' className="button">Register</button>
          </form>
      </div>
    );
}

export default Registration;