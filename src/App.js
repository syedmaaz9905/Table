import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Table from './components/Table';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [rows, setRows] = useState([
    {
      username: "Maaz",
      password: "maaz123",
      availability: "yes"
    },
    {
      username: "Taha",
      password: "taha123",
      availability: "no"
    },
    {
      username: "Umar",
      password: "umar123",
      availability: "yes"
    },
    {
      username: "Arham",
      password: "arham123",
      availability: "no"
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex))
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          return newRow;
        })
      );
  };

  const handleLogin = () => {
    // Check if the entered username and password match the hardcoded values
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      {!loggedIn ? (
        // Show login form if not logged in
        <div className="login-card">
          <h1>Login</h1>
          <label htmlFor="username" className="login-label">Username: </label>
          <input type="text" id="username" className="login-input" onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password" className="login-label">Password: </label>
          <input type="password" id="password" className="login-input" onChange={(e) => setPassword(e.target.value)} />
          {loginError && <p className="login-error">Invalid username or password. Please try again.</p>}
          <button onClick={handleLogin} className="login-button">Login</button>
        </div>
      ) : (
        <>
          <div className="search-container">
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              id="search"
              className="search-input"
              placeholder="Search By Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table rows={filteredRows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
          <button className='btn' onClick={() => setModalOpen(true)}>
            Add
          </button>
          {modalOpen && <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />}
        </>
      )}
    </div>
  );
}

export default App;
