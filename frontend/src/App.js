import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Pages/Main/Main';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import User from './Pages/User/User';
import Admin from './Pages/Admin/Admin';

function App() {
  return (
    <Router>
      <Header className="sticky-top" />

      {/* <Link to="/login">Login</Link> */}
      <Container style={{ marginTop: '60px' }}>
        <Routes>
          {/* <Main /> */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
