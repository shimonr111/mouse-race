import React, { useState, useEffect, useRef } from 'react';
import CollectElement from '../elements/CollectElement';
import AvoidElement from '../elements/AvoidElement';
import ChangeElement from '../elements/ChangeElement';
import Element from '../elements/Element';
import '../styles/styles.css';

let exportedScoreboard = []; // Export the score board to Leaderboard.js
const numOfElementsForEachType = 2;

function Game() {
  const [timer, setTimer] = useState(0.0);
  const [elements, setElements] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [disableStartButton, setdisableStartButton] = useState(false);
  const [isVictory, setIsVictory] = useState(0);
  const [name, setPlayerName] = useState('');
  const [scoreBoard, setScoreboard] = useState([]);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const elementsRef = useRef(elements); // Use a ref to store the elements

  // useEffect to to start the timer, its triggered when gameStarted changed
  useEffect(() => {
    let intervalId;
    if (gameStarted) {
      const startTime = Date.now();
      const updateTimer = () => {
        const elapsedTime = Date.now() - startTime;
        setTimer(elapsedTime / 1000); // Convert milliseconds to seconds
        intervalId = setTimeout(updateTimer, 10); // Update timer every 10 milliseconds for accuracy
      };
      updateTimer();
    } else {
      clearInterval(intervalId); // Clear interval when gameStarted is false
    }
    return () => clearInterval(intervalId); // Clear interval in other scenarios
  }, [gameStarted]);

  // useEffect to handle end of game and check if player won or lost, its triggered when isVictory changed
  useEffect(() => {
    elements.forEach(element => { element.cleanup(); }); // cleanup the interval of entire elements in the list
    if (isVictory === 1) { // if player won
      setSubmissionComplete(false); // Mark submission as not complete, so it will display the submit form after the game
      window.alert("You won the game with time of " + timer.toFixed(2) + " seconds!"); 
      setElements([]);
    } else if (isVictory === 2) { // if player did not won
      setdisableStartButton(false); // enable the Start button, so player can start the game again
      window.alert("You lost the game!"); 
      setElements([]);
    };
  }, [isVictory]);

  // useEffect to update exportedScoreboard when scoreBoard changes
  // I am using exportedScoreboard in Leaderboard.js to update DB in Firebase and display it in the UI
  useEffect(() => {
    exportedScoreboard = scoreBoard; 
  }, [scoreBoard]);

  // Update elementsRef whenever elements changes
  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

   // I used useRef because it allows direct access to mutable values across renders, 
   // It's necessary to clear the interval in edge cases, such as navigating to another page before the game ends
   useEffect(() => {
    return () => {
      elementsRef.current.forEach(element => element.cleanup());
    };
  }, []);

  // Button start pressed
  const startGame = () => {
    setIsVictory(0);
    setdisableStartButton(true); // Disable the start button
    setGameStarted(true); // Start the timer inside the useEffect
    setElements(createElements()); // Create the elements
  };

  // Create the elements dynamically using OOP principles
  const createElements = () => {
    let elements = [];
    for (let i = 0; i < numOfElementsForEachType; i++) {
      elements.push(new CollectElement(() => handleCollectElementClick(elements[3*i])));
      elements.push(new AvoidElement(handleAvoidElementClick));
      elements.push(new ChangeElement(() => handleCollectElementClick(elements[(3*i)+2]), handleAvoidElementClick));
    }
    return elements;
  };

  // Handle click on AvoidElement
  const handleAvoidElementClick = () => {
    setIsVictory(2); // The player lost the game
    setTimer(0.0);
    setGameStarted(false);
  };

  // Handle click on CollectElement
  const handleCollectElementClick = (clickedElement) => {
    clickedElement.cleanup(); // Clear the interval of the specific clicked element
    setElements(prevElements => {
      // removing the clickedElement from the list of elements
      const updatedElements = prevElements.filter(element => element !== clickedElement); 
      // Check if all Collect and Change elements are removed
      const hasCollectOrChange = updatedElements.some(element => (
        element instanceof CollectElement || element instanceof ChangeElement
      ));
      if (!hasCollectOrChange) {
        setIsVictory(1); // The player won the game
        setGameStarted(false);
      }
      return updatedElements;
    });
  };

  // Handle input change for player name
  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  // Handle submission of player name and score
  const handleSubmit = () => {
    if (name.trim() !== '') {
      const newScore = {
        name: name,
        time: timer
      };
      setScoreboard(prevScoreboard => [...prevScoreboard, newScore]); // add it to the list of scoreBoard
      setTimer(0.0);
      setSubmissionComplete(true); // Mark submission as complete so it won't display the submission form
      setPlayerName(''); // Clear name for next use
      setdisableStartButton(false); // Enable the start button so player can start new game
    }
  };

  return (
    <div className="game-container">
      <div className="controls">
        <button className="button-start button1-start" onClick={startGame} disabled={disableStartButton}>Start</button>
        <div>Timer: {timer}s</div>
        {!submissionComplete && isVictory === 1 && ( // if submission not completed and the player won, display the submission form
        <div className="content">
          <p>Congratulations! Enter your name for the leaderboard:</p>
          <input type="text" value={name} onChange={handleNameChange} />
          <button className="button-submit" onClick={handleSubmit}>Submit</button>
        </div>
      )}
      </div>
      <div className="game-area">
        <Element elements={elements}/>
      </div>
    </div>
  );
};

export default Game;
export { exportedScoreboard };