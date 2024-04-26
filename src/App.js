import { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/Modal';
import Table from './components/Table';
import EmailModal from './components/EmailModal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


let API_URL = "https://blazemailer.vexabyte.in/";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [email, setEmail] = useState('');

  const [rows, setRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);



  useEffect(() => {
    async function getInfo() {

      const res = await axios.get(API_URL + "table_data_fetch.php", {
        headers: {
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }
      }); // select * from users order by id
      if (res.status === 200) {
        setRows(res.data);
      }
      else {
        alert("Error occurred while fetching the data...")
      }

    }
    getInfo();
    ;
  }, []);

  const handleSendEmail = (idx) => {
    setSelectedRow(idx);
    setEmailModalOpen(true);
  };

  const handleDeleteRow = async (targetIndex) => {

    const data = { 'id': targetIndex };

    const res = await axios.post(
      API_URL + "delete_row_table.php",
      data,
      {
        headers: {
          'Content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        }
      }
    );

    // const res = await axios.post(API_URL + "delete_row_table.php", data, { headers:headers });

    if (res.status === 200) {
      setRows(rows.filter(row => row.id !== targetIndex));
    }
    else {
      alert("Error occurred while deleting!")
    }
    // const promisePool = pool.promise();

    // const [error, res, fields] = await promisePool.query("DELETE FROM `Users` WHERE `id` = ?", [targetIndex]);

    // if (!error) {
    //   setRows(rows.filter(row => row.id !== targetIndex))
    // }
    // else {
    //   alert("Error occurred while deleting!")
    // }
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {

      const data = { 'user_id': newRow.user_id, 'password': newRow.password, 'is_available': Math.round(newRow.is_available) }

      const res = await axios.post(
        API_URL + "add_row_table.php",
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          }
        }
      );

      // const data = JSON.stringify({ 'user_id': newRow.user_id, 'password': newRow.password, 'is_available': Math.round(newRow.is_available) })

      // const res = await axios.post(API_URL + "add_row_table.php", data, { headers:headers });
      if (res.status === 200) {
        newRow.id = res.data;
        setRows([...rows, newRow]);
      }
      else {
        alert("Error occurred while inserting new row");
      }
      // const promisePool = pool.promise();

      // const [error, res, fields] = await promisePool.query("INSERT INTO Users (user_id, password, is_available) VALUES (?, ?, ?)",
      //   [newRow.user_id, newRow.password, Math.round(newRow.is_available)]);
      // if (!error) {
      //   setRows([...rows, newRow])
      // }
      // else {
      //   alert("Error occurred while inserting new row");
      // }

    }
    else {

      const data = { 'id': Math.round(rows[rowToEdit].id), 'user_id': newRow.user_id, 'password': newRow.password, 'is_available': Math.round(newRow.is_available) }

      const res = await axios.post(
        API_URL + "update_row_table.php",
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          }
        }
      );

      // const res = await axios.post(API_URL + "update_row_table.php", data, { headers:headers });
      if (res.status === 200) {
        setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
      }
      else {
        alert("Error occurred while updating the row...")
      }

      // const promisePool = pool.promise();

      // const [error, res, fields] = await promisePool.query("UPDATE Users SET user_id = ?  AND password = ? AND is_available = ? WHERE id = ? ",
      //   [newRow.user_id, newRow.password, Math.round(newRow.is_available), rows[rowToEdit].id]);
      // if (!error) {
      //   setRows(
      //     rows.map((currRow, idx) => {
      //       if (idx !== rowToEdit) return currRow;
      //       return newRow;
      //     })
      //   );
      // }
      // else {
      //   alert("Error occurred while updating the row...")
      // }
    }

  };

  const handleLogin = () => {
    // Check if the entered username and password match the hardcoded values
    if (username === 'Mirsad' && password === 'Mirsad@1992') {
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.user_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="App">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          {/* <Table rows={filteredRows} deleteRow={handleDeleteRow} editRow={handleEditRow} /> */}
          <Table rows={filteredRows} deleteRow={handleDeleteRow} editRow={handleEditRow} sendEmail={handleSendEmail} />
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
          {emailModalOpen && (
            <EmailModal
              closeModal={() => setEmailModalOpen(false)}
              onSendEmail={async (emailContent) => {
                // Implement your logic to send email using emailContent
                // setOpen(true)
                const res = await axios.post(
                  API_URL + "table_php_mailer.php",
                  emailContent,
                  {
                    headers: {
                      'Content-type': 'multipart/form-data',
                      "Access-Control-Allow-Origin": "*",
                    }
                  }
                );

                // const data = JSON.stringify({ 'user_id': newRow.user_id, 'password': newRow.password, 'is_available': Math.round(newRow.is_available) })

                // const res = await axios.post(API_URL + "add_row_table.php", data, { headers:headers });
                if (res.status === 200) {
                  alert(res.data);
                }
                else {
                  alert("Error occurred while sending email");
                }

                setOpen(false);
                setEmailModalOpen(false);
              }}
              selectedRowData={rows[selectedRow]}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
