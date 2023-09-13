//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'wouter';
import {Container , Button} from 'react-bootstrap';

function App() {
  return (
    <Container fluid className="Home">


<video className="video-size" autoPlay muted loop>
  <source
    src="logo_animation.mp4"
    type="video/mp4"
  />
</video>



    <div className="App">
    </div>
     
      

      <h1 className='gameTitle'>Catch Game</h1>

      <Link href="/Game" >
        <Button size="lg" className="playButton" >Start game</Button>
      </Link>

      <div className="Summary">
      <h3> Summary </h3>
      </div>

     <div className="grid">
      <Row>
        <Col>Date/Score</Col>
      </Row>
      <Row>
        <Col>Date/Score</Col>
      </Row>
      <Row>
        <Col>Date/Score</Col>
      </Row>
      <Row>
        <Col>Date/Score</Col>
      </Row>
      <Row>
        <Col>Date/Score</Col>
      </Row>
      </div>
    </Container>

    
    
    
  );
}

export default App;
