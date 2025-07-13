  import { Link } from 'react-router-dom';

  const Home = () => {
    return (
      <div className="relative min-h-screen bg-white p-4">
        <div className="absolute top-4 right-4 text-sm text-black font-semibold">
          Aaron Thai - z5481487, COMP6841 25T2
        </div>
        <div className="text-center mt-24 text-black">
          <h1 className="text-3xl font-bold mb-4">Network Packet Visualiser</h1>
          <h2 className="mb-4">This is a simple network packet visualiser that showcases what some network attacks look like.</h2>
          <h2 className="mb-4">
            Network attacks are important to understand as they are significant threat to individuals and organisations.
          </h2>
          <h2> They can cause potential financial losses, data breaches, and reputational damage.</h2>
          <div className="flex flex-col items-center gap-4 mt-6">
            <Link
              to="/synflood"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to SYN Flood Simulation
            </Link>
            <Link
              to="/dnstunnel"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to DNS Tunneling Simulation
            </Link>
            <Link
              to="/portscan"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Port Scan Simulation
            </Link>            
          </div>
        </div>
      </div>
    );
  };

  export default Home;
