import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiBarChartBoxLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
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
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created successfully! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/30
     outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm
     ${errors[field] ? 'border-red-400' : 'border-white/20 focus:border-primary-400'}`;

  const fields = [
    { id: 'reg-name', name: 'name', label: 'Full Name', type: 'text', placeholder: 'Kamlesh Kumar', icon: RiUserLine },
    { id: 'reg-email', name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@company.com', icon: RiMailLine },
    { id: 'reg-pass', name: 'password', label: 'Password', type: showPassword ? 'text' : 'password', placeholder: '••••••••', icon: RiLockLine },
    { id: 'reg-confirm', name: 'confirmPassword', label: 'Confirm Password', type: showPassword ? 'text' : 'password', placeholder: '••••••••', icon: RiLockLine },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
      <div className="text-center mb-7">
        <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-4 shadow-glow">
          <RiBarChartBoxLine size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
        <p className="text-white/60 text-sm mt-1">Join EmpDash — your team dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ id, name, label, type, placeholder, icon: Icon }) => (
          <div key={name}>
            <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-1.5">{label}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Icon size={16} />
              </div>
              <input
                id={id} name={name} type={type} value={form[name]}
                onChange={handleChange} placeholder={placeholder}
                className={inputClass(name)}
              />
              {(name === 'password' || name === 'confirmPassword') && (
                <button type="button" onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/70">
                  {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              )}
            </div>
            {errors[name] && <p className="mt-1.5 text-xs text-red-400">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl
                     transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2
                     shadow-glow active:scale-95 mt-2">
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-white/50 text-sm mt-5">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
