import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <div
          className="text-2xl font-semibold cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate('/')}
        >
          🧠 Packet Visualiser
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition font-medium"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
