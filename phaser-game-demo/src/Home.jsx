import './App.css';
import './custom-font.css';
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'wouter';

function App() {
  const [topScores, setTopScores] = useState([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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

  const buttonStyle = {
    backgroundColor: isButtonHovered ? 'darkgreen' : 'green',
    color: 'white',
    border: isButtonHovered ? '2px solid darkgreen' : '2px solid green',
    transition: 'background-color 0.3s, border-color 0.3s',
    fontFamily: 'TruculentaBold',
    fontSize: '25px',
  };

  const textStyle = {
    fontFamily: 'TruculentaBold',
  };

  // Function to play the button click sound
  const playButtonSound = () => {
    const audio = new Audio('/sound/button.mp3'); // Path to the button sound file
    audio.play();
  };

  return (
    <Container fluid className="Home">
      <audio autoPlay loop>
        <source src="/sound/homeBackground.mp3" type="audio/mpeg" />
      </audio>

      <video className="video-size" autoPlay muted loop>
        <source src="logo_animation.mp4" type="video/mp4" />
      </video>

      <div className="App"></div>

      <h1 className='gameTitle' style={textStyle}>Catch Game</h1>

      <Link href="/Game">
        <Button
          variant="success"
          size="lg"
          style={buttonStyle}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={playButtonSound} // Play sound on button click
        >
          Start game
        </Button>
      </Link>

      <div className="Summary" style={textStyle}>
        <h3>
          <row>
            <Col>RULE!</Col>
            <row>
              <Col>Catch as Many Cards</Col>
            </row>
          </row>
          <row>
            <Col>1 point - Blue: 57.5%</Col>
          </row>
          <row>
            <Col>2 point - White: 17.5%</Col>
          </row>
          <row>
            <Col>4 point - Red: 12.5%</Col>
          </row>
          <row>
            <Col>8 point - Purple: 2.5%</Col>
          </row>
          <row>
            <Col>GameOver - Skull: 10%</Col>
          </row>
        </h3>
      </div>

      <div className="grid">
        <h3>
          <Row>
            <Col style={textStyle}>Leaderboard</Col>
          </Row>
          {topScores.map((score, index) => (
            <Row key={index}>
              <Col style={textStyle}>
                {`${formatOntarioDate(score.date)}: ${score.score}`}
              </Col>
            </Row>
          ))}
        </h3>
      </div>
    </Container>
  );
}

export default App;
