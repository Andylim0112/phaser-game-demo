//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src="/.images/logo.png" alt="Logo" className="logo" />
      <h1>Catch Game</h1>
      <button className="start-button">Start Game</button>

      <h3> Summary </h3>

      <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>

    </header>
    
    </div>
  );
}

export default App;
