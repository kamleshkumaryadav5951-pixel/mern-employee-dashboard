import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiBarChartBoxLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const [form, setForm] = useState({ email: 'admin@dashboard.com', password: 'admin123' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await login(form);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-4 shadow-glow">
          <RiBarChartBoxLine size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-white/60 text-sm mt-1">Sign in to your EmpDash account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-white/80 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <RiMailLine size={16} />
            </div>
            <input
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@dashboard.com"
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/30
                          outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm
                          ${errors.email ? 'border-red-400' : 'border-white/20 focus:border-primary-400'}`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-white/80 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <RiLockLine size={16} />
            </div>
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-white placeholder-white/30
                          outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm
                          ${errors.password ? 'border-red-400' : 'border-white/20 focus:border-primary-400'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/70"
            >
              {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 shadow-glow active:scale-95 mt-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Sign In'}
        </button>
      </form>

      {/* Demo hint */}
      <div className="mt-5 p-3 bg-white/5 rounded-xl border border-white/10 text-center">
        <p className="text-white/50 text-xs">
          Demo: <span className="text-white/80 font-medium">admin@dashboard.com</span> /{' '}
          <span className="text-white/80 font-medium">admin123</span>
        </p>
      </div>

      <p className="text-center text-white/50 text-sm mt-5">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
