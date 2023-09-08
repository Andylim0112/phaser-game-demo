// import {React} from "react";
// import { Container } from 'react-bootstrap';
// import './App.css';  // to maintain the same background

// function Game() {
//   return (
//     <Container fluid className="Home">
//       {/* You can add any other content here if needed */}
//     </Container>
//   );
// }

// export default Game;
import {useRef, useState} from "react";
import GamePhaser from "./GamePhaser";
export default function Game() {
    const [gameRef, setGameRef] = useState(null);

    return (
        <GamePhaser setGameRef={setGameRef} />
    )
}