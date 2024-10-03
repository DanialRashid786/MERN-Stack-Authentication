// src/pages/SignupPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../Components/AuthForm';
import { handleError, handleSuccess } from '../utils';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required.');
    }

    try {
      // Call the backend signup API (replace with your backend endpoint)
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { success, message, error } = data;

      if (success) {
        handleSuccess('Signup successful!');
        setTimeout(() => {
          navigate('/login');
        }, 500);
      } else if (error) {
        const details = error?.details[0]?.message || 'Signup failed';
        handleError(details);
      } else {
        handleError(message || 'Signup failed! Please try again later.');
      }
    } catch (error) {
      handleError('Error during signup. Please try again later.');
      console.error('Error during signup: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>

        {/* Auth Form Component */}
        <AuthForm
          isLogin={false}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
