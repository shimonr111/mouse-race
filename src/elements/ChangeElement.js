import GameElement from './GameElement';

class ChangeElement extends GameElement {
  // private fields
  #onCollectCallback;
  #onAvoidCallback;
  #moveInterval;
  #colorChangeInterval;
  #clockwiseDirections;
  #currentDirectionIndex;

  constructor(onCollectCallback, onAvoidCallback) {
    super('Collect', 'green', 'square');
    this.#onCollectCallback = onCollectCallback;
    this.#onAvoidCallback = onAvoidCallback;
    this.#moveInterval = setInterval(this.move, 1000); // Move every 1 second
    this.#colorChangeInterval = setInterval(this.changeColor, 5000); // Change color every 5 seconds
    this.#clockwiseDirections = ['top', 'right', 'bottom', 'left']; // Clockwise movement directions
    this.#currentDirectionIndex = 0;
  }

  //Getters and Setters
  get onCollectCallback() {
    return this.#onCollectCallback;
  }

  set onCollectCallback(callback) {
    this.#onCollectCallback = callback;
  }

  get onAvoidCallback() {
    return this.#onAvoidCallback;
  }

  set onAvoidCallback(callback) {
    this.#onAvoidCallback = callback;
  }

  get moveInterval() {
    return this.#moveInterval;
  }

  set moveInterval(interval) {
    this.#moveInterval = interval;
  }

  get colorChangeInterval() {
    return this.#colorChangeInterval;
  }

  set colorChangeInterval(interval) {
    this.#colorChangeInterval = interval;
  }

  get clockwiseDirections() {
    return this.#clockwiseDirections;
  }

  set clockwiseDirections(directions) {
    this.#clockwiseDirections = directions;
  }

  get currentDirectionIndex() {
    return this.#currentDirectionIndex;
  }

  set currentDirectionIndex(index) {
    this.#currentDirectionIndex = index;
  }

  // Override move() method from base class - the element moves every 1 second in clockwise directions
  move = () => {
    let currentDirection = this.#clockwiseDirections[this.#currentDirectionIndex];
    switch (currentDirection) {
      case 'top':
        this.position.top -= 10; // Move up
        break;
      case 'right':
        this.position.left += 10; // Move right
        break;
      case 'bottom':
        this.position.top += 10; // Move down
        break;
      case 'left':
        this.position.left -= 10; // Move left
        break;
      default:
        break;
    }
    this.#currentDirectionIndex = (this.#currentDirectionIndex + 1) % this.#clockwiseDirections.length;
  }

  // Override changeColor() method from base class - toggle color between green and red every 5 seconds
  changeColor = () => {
    this.color = this.color === 'green' ? 'red' : 'green';
    // Update behavior based on color
    if (this.color === 'red') {
      // Behavior for avoid
      this.type = 'Avoid';
    } else {
      // Behavior for collect
      this.type = 'Collect';
    }
  }

  // Override onClick() method from base class - change the behaviour based on the current color
  onClick() {
    if (this.type === 'Collect') {
      this.#onCollectCallback(); // Call collect callback function
    } else if (this.type === 'Avoid') {
      this.#onAvoidCallback(); // Call avoid callback function
    }
  }

  // Override cleanup() method from base class - clear the intervals
  cleanup() {
    clearInterval(this.#moveInterval);
    clearInterval(this.#colorChangeInterval); 
  }
}

export default ChangeElement;
