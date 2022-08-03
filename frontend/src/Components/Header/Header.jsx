import React from 'react';
import styles from './Header.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Logout/Logout';

const Header = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  // console.log(user.data.user);
  return (
    <div className={styles.header}>
      <Navbar
        style={{
          backgroundColor: 'rgba(96, 95, 95, 0.9)',
        }}
        className="sticky-top"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home">
            {user ? user.data.user.name : 'Tours'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link className={styles.link} to="/">
                  Home
                </Link>
              </Nav.Link>
              {!user && (
                <Nav.Link>
                  <Link className={styles.link} to="/login">
                    Login
                  </Link>
                </Nav.Link>
              )}
              {!user && (
                <Nav.Link>
                  <Link className={styles.link} to="/register">
                    Register
                  </Link>
                </Nav.Link>
              )}
              {user && (
                <Nav.Link>
                  <Link className={styles.link} to="/user">
                    MyProfile
                  </Link>
                </Nav.Link>
              )}
              {user && (
                <Nav.Link>
                  <Logout />
                </Nav.Link>
              )}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
