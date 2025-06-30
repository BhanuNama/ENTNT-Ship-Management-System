import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Ship, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
    { role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
    { role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' }
  ];

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/ship-background.jpg)',
        }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-4">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full shadow-lg">
              <Ship className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="mt-4 font-header text-2xl font-bold text-white drop-shadow-lg">
            ENTNT Marine System
          </h2>
          <p className="mt-1 font-body text-sm text-white/90 drop-shadow-md">
            Ship Maintenance Management Dashboard
          </p>
        </div>

        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl">
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="font-body text-sm text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label form-label-required">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label form-label-required">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-11"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="px-6 pb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/60 dark:border-gray-600/60" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white/90 dark:bg-gray-800/90 font-body text-gray-600 dark:text-gray-400 rounded-full">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillDemo(cred.email, cred.password)}
                  className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-action text-sm font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 hover:scale-105 transition-all duration-200 w-full"
                >
                  Login as {cred.role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;