// src/components/AuthForm.js
import React from 'react';

const AuthForm = ({ isLogin, formData, handleInputChange, handleFormSubmit }) => {
  return (
    <div className="w-full max-w-xs mx-auto mt-20">
      <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        
        {/* Name Field (Only in Signup) */}
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
              // required={!isLogin} // Required only in signup
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
