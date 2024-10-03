// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../Components/AuthForm';
import { handleError, handleSuccess } from '../utils';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the backend login API (replace with your backend endpoint)
      const response = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { success, message, jwtToken, name, error } = data;

      if (success) {
        handleSuccess('Signin successful!');
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/');
        }, 500);
      } else if (error) {
        const details = error?.details[0]?.message || 'Error during signin';
        handleError(details);
      } else {
        handleError(message || 'Error during signin. Please try again later.');
      }
    } catch (error) {
      handleError('Error during login. Please try again later.');
      console.error('Error during login: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>

        {/* Auth Form Component */}
        <AuthForm
          isLogin={true}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
