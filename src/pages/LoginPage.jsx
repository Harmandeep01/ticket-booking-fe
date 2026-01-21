import React, { useState } from 'react';
import api from '../config/api';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/login' : '/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const { data } = await api.post(endpoint, payload);
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- Header Section --- */}
      <header className="flex items-center justify-between border-b border-[#dce3e4] dark:border-[#3a3f42] px-6 md:px-10 py-3 bg-white dark:bg-background-dark sticky top-0 z-50 transition-colors">
        <div className="flex items-center gap-4 text-[#121617] dark:text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight">K&A Ticket Booking</h2>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            {['Movies', 'Carnivals', 'Events'].map((item) => (
              <a key={item} className="text-[#121617] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">{item}</a>
            ))}
          </nav>
          <Button className="!h-10 !w-auto px-6 text-sm">Support</Button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#121617] dark:text-white">
          <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#2b3035] p-6 border-b border-[#dce3e4] dark:border-[#3a3f42] flex flex-col gap-4">
          {['Movies', 'Carnivals', 'Events'].map((item) => (
            <a key={item} href="#" className="font-medium dark:text-white">{item}</a>
          ))}
          <Button className="h-10">Support</Button>
        </div>
      )}

      {/* --- Main Auth Content --- */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="fixed top-20 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-primary/10 blur-[100px] rounded-full"></div>

        <div className="w-full max-w-[460px] flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-[#121617] dark:text-white text-[32px] font-bold leading-tight pb-2">
              {isLogin ? 'Access Your Experience' : 'Join the Experience'}
            </h1>
            <p className="text-[#667f85] dark:text-gray-400 text-sm">
              {isLogin ? 'Sign in to book tickets for the latest movies.' : 'Register now to start booking your favorite events.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#2b3035] rounded-xl shadow-xl border border-[#f1f3f4] dark:border-[#3a3f42] overflow-hidden">
            <div className="flex border-b border-[#dce3e4] dark:border-[#3a3f42]">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-sm font-bold transition-all ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-[#667f85] dark:text-gray-400'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-sm font-bold transition-all ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-[#667f85] dark:text-gray-400'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
              {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
              
              {!isLogin && (
                <InputField 
                  label="Full Name" 
                  placeholder="e.g. Alex Johnson" 
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  required
                />
              )}

              <InputField 
                label="Email Address" 
                placeholder="e.g. alex@example.com" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, 'email')}
                required
              />
              
              <InputField 
                label="Password" 
                type="password" 
                placeholder="Enter your password" 
                value={formData.password}
                onChange={(e) => handleInputChange(e, 'password')}
                required
                rightElement={isLogin && <a className="text-primary text-xs font-bold hover:underline" href="#">Forgot Password?</a>}
              />

              <Button type="submit" className="mt-2" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>

              <div className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-[#dce3e4] dark:bg-[#3a3f42]"></div>
                <p className="text-[#667f85] dark:text-gray-500 text-[10px] uppercase font-bold tracking-widest">Or continue with</p>
                <div className="h-px flex-1 bg-[#dce3e4] dark:bg-[#3a3f42]"></div>
              </div>

              <Button variant="outline" type="button">
                <svg className="size-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                </svg>
                Google
              </Button>
            </form>

            <div className="bg-gray-50 dark:bg-black/10 px-6 py-4 border-t border-[#dce3e4] dark:border-[#3a3f42]">
              <p className="text-center text-[#667f85] dark:text-gray-400 text-xs">
                {isLogin ? "New to K&A?" : "Already a member?"}{' '}
                <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold hover:underline">
                  {isLogin ? 'Create an account' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>

          <footer className="flex justify-center gap-6 mt-4">
            {['Terms of Service', 'Privacy Policy', 'Help Center'].map(f => (
              <a key={f} className="text-[#667f85] dark:text-gray-500 text-xs font-medium hover:text-primary" href="#">{f}</a>
            ))}
          </footer>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;