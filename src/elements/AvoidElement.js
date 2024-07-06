import GameElement from './GameElement';

class AvoidElement extends GameElement {
  // private fields
  #direction;
  #onClickCallback;
  #moveInterval;

  constructor(onClickCallback) {
    super('Avoid', 'red', 'circle'); // calling the construcor of base class
    this.#direction = 'left';
    this.#onClickCallback = onClickCallback; // setting the onClick function that received from Game.js
    this.#moveInterval = setInterval(this.move, 3000); // Move every 3 seconds
  }

  // Getters and Setters
  get direction() {
    return this.#direction;
  }

  set direction(value) {
    this.#direction = value;
  }

  get onClickCallback() {
    return this.#onClickCallback;
  }

  set onClickCallback(callback) {
    this.#onClickCallback = callback;
  }

  get moveInterval() {
    return this.#moveInterval;
  }

  set moveInterval(interval) {
    this.#moveInterval = interval;
  }

  // Override move() method from base class - the element move every 3 seconds
  move = () => {
    // Randomly choose left or right direction
    const randomDirection = Math.random() < 0.5 ? 'left' : 'right';
    this.#direction = randomDirection;
  }

  // Override onClick() method from base class
  onClick() {
    this.#onClickCallback(); // Call the callback function passed from Game.js component
  }

  // Override cleanup() method from base class
  cleanup() {
    clearInterval(this.#moveInterval); // Clear the interval
  }
}

export default AvoidElement;
