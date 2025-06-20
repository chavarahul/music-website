import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { Music, Eye, EyeOff } from 'lucide-react';

function Auth() {
  const { login, signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'Username can only contain letters, numbers, underscores, or hyphens';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      return 'Password must include uppercase, lowercase, number, and special character';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!isLogin && password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.username = validateUsername(username);
    newErrors.password = validatePassword(password);
    if (!isLogin) {
      newErrors.confirmPassword = validateConfirmPassword(password, confirmPassword);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const success = isLogin ? login(username.trim(), password.trim()) : signup(username.trim(), password.trim());
    if (success) {
      navigate('/');
    } else {
      setErrors((prev) => ({
        ...prev,
        form: isLogin ? 'Invalid credentials' : 'Username already taken',
      }));
    }
    setIsLoading(false);
  };

  const handleBarHover = (e) => {
    e.currentTarget.classList.add('animate-music-pulse-fast');
  };

  const handleBarLeave = (e) => {
    e.currentTarget.classList.remove('animate-music-pulse-fast');
  };


  return (
    <div className="min-h-screen flex relative overflow-hidden">

      <div className="w-full lg:w-[35%] flex flex-col items-center lg:justify-between justify-center p-6 sm:p-16 z-10 relative bg-[#f8f8f8] backdrop-blur-lg rounded-r-3xl border-r shadow-lg bg-studio border-default">
        <div className={`max-md:mb-10 p-3 flex justify-center items-center gap-2 w-full ${!isLogin && 'lg:-mt-12 lg:pb-16'}`}>
          <Music className="w-6 h-6 text-green-700" />
          <span className="text-2xl font-semibold text-gray-900">Melofy</span>
        </div>
        <div className="w-full max-w-md space-y-8">
          <div className="relative">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">{isLogin ? 'Welcome Back✌️' : 'Join Melofy✌️'}</h1>
            <p className="text-gray-600 text-lg font-medium">{isLogin ? 'Sign in to your account' : 'Create an account to start your musical journey'}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="rahul"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: validateUsername(e.target.value), form: '' }));
                }}
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-200'} rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md`}
                required
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div className="group relative">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                {isLogin && (
                  <button type="button" className="text-sm text-green-600 hover:text-green-700 transition-colors duration-200">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value), form: '' }));
                  }}
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            {!isLogin && (
              <div className="group relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(password, e.target.value), form: '' }));
                    }}
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md pr-12`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}
            {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 px-6 rounded-[10px] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-[10px] animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>
          <div className="text-center pt-4">
            <span className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="ml-2 text-green-600 font-semibold hover:text-green-700 transition-colors duration-200 hover:underline"
            >
              {isLogin ? 'Sign Up Now' : 'Sign In'}
            </button>
          </div>
          <div className="text-xs text-gray-500 text-center pt-4 leading-relaxed">
            By continuing, you agree to Melofy's{' '}
            <button className="text-green-600 hover:text-green-700 hover:underline transition-colors duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-green-600 hover:text-green-700 hover:underline transition-colors duration-200">
              Privacy Policy
            </button>
            , and to receive periodic emails with updates.
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 z-10 relative bg-[#fdfdfd]">
        <div className="text-center -mt-10 max-w-2xl w-full">
          <div className="flex items-center justify-center relative">
            <span
              className="text-9xl text-green-600/60 mt-6 animate-pulse-quote transition-transform duration-300"
            >
              “
            </span>
            <h2 className="text-3xl text-gray-900 font-semibold animate-wave-text">
              Discover Your Rhythm with Melofy
            </h2>
          </div>
          <p className="text-lg text-gray-700 animate-fade-in leading-relaxed font-medium pb-10" style={{ animationDelay: '0.2s' }}>
            Immerse yourself in a world of music with Melofy. Create personalized playlists, explore new genres, and connect with a vibrant community of music lovers. Let the rhythm guide you to new experiences and unforgettable melodies.
          </p>
          <div className="flex justify-center space-x-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="music-bar bg-green-600"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  height: `${20 + Math.random() * 20}px`,
                }}
                onMouseEnter={handleBarHover}
                onMouseLeave={handleBarLeave}
              ></span>
            ))}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-2xl flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-green-600/30 border-t-green-600 rounded-[10px] animate-spin" />
            <span className="text-gray-900 font-semibold">Authenticating...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;