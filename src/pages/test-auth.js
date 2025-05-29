import { useState } from 'react';
import Head from 'next/head';

export default function TestAuth() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/test-auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        setMessage('Registration successful!');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/test-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        setMessage('Login successful!');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/test-auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        setUser(null);
        setMessage('Logged out successfully');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setMessage('An error occurred during logout');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/test-auth/me', {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        setMessage('User data fetched successfully');
      } else {
        setMessage(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      setMessage('An error occurred while fetching user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>JWT Auth Test</title>
      </Head>
      
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">JWT Authentication Test</h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        
        {!user ? (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Register</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    minLength="6"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </form>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Login'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h2>
            <p className="mb-4">Email: {user.email}</p>
            <div className="space-y-4">
              <button
                onClick={fetchUser}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh User Data'}
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
