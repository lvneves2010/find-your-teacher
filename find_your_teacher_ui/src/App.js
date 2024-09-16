import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users from the API when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error fetching users');
      console.error(err);
    }
  };

  // Function to create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newUser = { name, email, discipline };
      await axios.post('http://localhost:5000/api/users', newUser);
      setName('');
      setEmail('');
      setDiscipline('');
      fetchUsers(); // Refresh user list after adding a new user
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error creating user');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      {/* Form to create a new user */}
      <form onSubmit={handleCreateUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Discipline:</label>
          <input
            type="text"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* List of users */}
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) {user.discipline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Leo
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
