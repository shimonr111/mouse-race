import '../styles/styles.css';

const Home = () => {
  return (
    <div>
      <h1 className="content">Welcome to Mouse Race Game!</h1>
      <div>
        <h2 className="content">Instructions:</h2>
        <ul>
          <li>
            <strong>Start the Game:</strong> Click the <strong>Start</strong> button in the center of the screen to begin. All game elements will appear in random positions.
          </li>
          <br></br>
          <li>
            <strong>Achieve Victory:</strong> The game ends in victory when you successfully make all the rectangles and squares elements disappear. You can only click on them when they appear in green.
          </li>
          <br></br>
          <li>
          <strong>Track Your Time:</strong> Keep an eye on the timer at the top of the screen to see how much time has elapsed.
          </li>
          <br></br>
        </ul>
        <p className="content">
        Press the <strong>Play Game</strong> button on the sidebar to begin!
        </p>
      </div>
    </div>
  );
};

export default Home;
