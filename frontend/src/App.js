import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Pages/Main/Main';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import User from './Pages/User/User';
import Admin from './Pages/Admin/Admin';
import { useLocalStorage } from './utilites/useLocalStorage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tour from './Pages/Tour/Tour';
import styles from './App.module.css';
import Spinner from './Components/Spinner/Spinner';
import host from './utilites/host';

const API_URL = `${host()}tours`;

function App() {
  const [state, setState] = useLocalStorage('tours', []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setState(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (state.length < 1) {
      fetchData();
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Router>
      <Header className="sticky-top" />
      <Container style={{ marginTop: '60px' }}>
        <Routes>
          <Route path="/" element={<Main data={state} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tour/:id" element={<Tour data={state} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
