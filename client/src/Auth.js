import React, { useState } from 'react';
import axios from 'axios';

const Authentication = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', loginData);
      console.log('Login response:', response.data);

      // Handle successful login
      // Assuming the server responds with a token upon successful login
      const { _id, token } = response.data;

      // Store the token in localStorage for future requests or authentication purposes
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);

      // Redirect the user to a different page or perform any other action
      window.location.href = '/Home';
    } catch (error) {
      console.error('Login error:', error.response.data);
      // Handle login error - e.g., display error message to the user
      // Update state or show an error message on the UI to notify the user
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', registerData);
      console.log('Register response:', response.data);
      // Handle successful registration - e.g., show success message, redirect to login, etc.
    } catch (error) {
      console.error('Register error:', error.response.data);
      // Handle registration error - e.g., display error message to the user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>

      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={registerData.username}
        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Authentication;
