class GameElement {
    // private fields
    #type;
    #color;
    #shape;
    #size;
    #position;
  
    constructor(type, color, shape) {
      this.#type = type;
      this.#color = color;
      this.#shape = shape;
      this.#size = Math.floor(Math.random() * 50) + 20;;
      this.#position = { top: (Math.random() * 70) + 2, left: (Math.random() * 70) + 2};
    }
  
    // Getters and Setters
    get type() {
      return this.#type;
    }
  
    set type(value) {
      this.#type = value;
    }
  
    get color() {
      return this.#color;
    }
  
    set color(value) {
      this.#color = value;
    }
  
    get shape() {
      return this.#shape;
    }
  
    set shape(value) {
      this.#shape = value;
    }
  
    get size() {
      return this.#size;
    }
  
    set size(value) {
      this.#size = value;
    }
  
    get position() {
      return this.#position;
    }

    set position(value) {
      this.#position = value;
    }
  
    // Method to move the element (will be implemented in subclasses)
    move() {
      
    }
  
    // Method to change color (will be implemented in ChangeElement subclass)
    changeColor() {
      
    }
  
    // Method to handle click behavior (will be implemented in subclasses)
    onClick() {
    
    }

    // Method to clear intervals (will be implemented in subclasses)
    cleanup() {
      
    }
  }
  
  export default GameElement;
  