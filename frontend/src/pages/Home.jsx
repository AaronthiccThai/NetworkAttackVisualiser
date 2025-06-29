import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Network Packet Visualiser</h1>
      <Link to="/synflood" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Go to SYN Flood Simulation
      </Link>
      
    </div>
  );
};

export default Home;
