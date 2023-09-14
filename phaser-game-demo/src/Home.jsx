import './App.css';
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'wouter';
import { Container, Button } from 'react-bootstrap';

function App() {
  const [topScores, setTopScores] = useState([]);

  // Load top scores from JSON when the homepage loads
  useEffect(() => {
    const existingScoresJSON = localStorage.getItem('topScores');
    if (existingScoresJSON) {
      const existingScores = JSON.parse(existingScoresJSON);
      setTopScores(existingScores);
    }
  }, []);

  // Function to format a date in Ontario time zone
  const formatOntarioDate = (dateString) => {
    const options = {
      timeZone: 'America/Toronto',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const ontarioDate = new Date(dateString).toLocaleString(undefined, options);
    return ontarioDate;
  };

  return (
    <Container fluid className="Home">
      <video className="video-size" autoPlay muted loop>
        <source src="logo_animation.mp4" type="video/mp4" />
      </video>

      <div className="App"></div>

      <h1 className='gameTitle'>Catch Game</h1>

      <Link href="/Game">
        <Button size="lg" className="playButton">
          Start game
        </Button>
      </Link>

      <div className="Summary">
        <h3> Summary </h3>
      </div>

      <div className="grid">
        <Row>
          <Col>Leaderboard</Col>
        </Row>
        {topScores.map((score, index) => (
          <Row key={index}>
            <Col>{`${formatOntarioDate(score.date)}: ${score.score}`}</Col>
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default App;
