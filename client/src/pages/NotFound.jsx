import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-8xl font-extrabold text-primary-200">404</h1>
      <p className="text-2xl font-bold text-gray-800 mt-4">Page not found</p>
      <p className="text-gray-500 mt-2 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/dashboard" className="btn-primary btn px-6 py-3">
        Back to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
