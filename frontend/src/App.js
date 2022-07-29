import './App.css';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/Main/Main';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <>
      <Header className="sticky-top" />
      <Container className="mb-4">
        <Main />
      </Container>
    </>
  );
}

export default App;
