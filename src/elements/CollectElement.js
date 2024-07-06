import GameElement from './GameElement';

class CollectElement extends GameElement {
  // private fields
  #direction;
  #onClickCallback;
  #moveInterval;

  constructor(onClickCallback) {
    super('Collect', 'green', 'rectangle');
    this.#direction = 'up';
    this.#onClickCallback = onClickCallback;
    this.#moveInterval = setInterval(this.move, 2000);
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

  // Override move() method from base class - the element moves every 2 seconds
  move = () => {
    // Randomly choose up or down direction
    const randomDirection = Math.random() < 0.5 ? 'up' : 'down';
    this.#direction = randomDirection;
  }

  // Override onClick() method from base class
  onClick() {
    this.#onClickCallback(); // Call the callback function passed from Game component
  }

  // Override cleanup() method from base class
  cleanup() {
    clearInterval(this.#moveInterval); // Clear the interval 
  }
}

export default CollectElement;
