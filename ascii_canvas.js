"use strict";

// CANVAS SETUP
const ascii_canvas = document.createElement("pre");
ascii_canvas.id = "ascii_canvas";
ascii_canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  margin: 0; padding: 0;
  font-family: monospace;
  font-size: 14px;
  line-height: 1;
  color: #00ff88;
  text-shadow: 0 0 6px #00ff88;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: transparent;
`;
document.body.prepend(ascii_canvas);

const characters = ".,-*:;!ioea#IOXHM8&@";
const NUM_PARTICLES = 10;

let canvas_width, canvas_height, ascii, mouse_x, mouse_y;
let followers = [], particles = [];

function floor(v) { return Math.floor(v); }
function random(v) { return Math.random() * v; }

function create_canvas() {
  const charW = 8.4;
  const charH = 14;
  canvas_width  = floor(window.innerWidth  / charW);
  canvas_height = floor(window.innerHeight / charH);
  ascii = Array.from({length: canvas_height}, () => new Array(canvas_width).fill(' '));
}

function clear() {
  ascii = Array.from({length: canvas_height}, () => new Array(canvas_width).fill(' '));
}

function render() {
  ascii_canvas.textContent = ascii.map(row => row.join('')).join('\n');
}

// CLASSES
class Follower {
  constructor() {
    this.x = floor(random(canvas_width));
    this.y = floor(random(canvas_height));
    this.acc_x = 0;
    this.acc_y = 0;
  }
  update() {
    if (this.x < mouse_x) { this.acc_x += 0.1; } else { this.acc_x -= 0.1; }
    if (this.y < mouse_y) { this.acc_y += 0.1; } else { this.acc_y -= 0.1; }
    this.acc_x *= 0.99;
    this.acc_y *= 0.99;
    this.x += this.acc_x;
    this.y += this.acc_y;
    particles.push(new Particle(floor(this.x), floor(this.y)));
  }
  draw() {
    if (this.x >= 0 && this.x < canvas_width && this.y >= 0 && this.y < canvas_height) {
      ascii[floor(this.y)][floor(this.x)] = '@';
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.c = characters.length - 1;
  }
  update() {
    this.c -= 1;
    return (this.c >= 0);
  }
  draw() {
    if (this.x >= 0 && this.x < canvas_width && this.y >= 0 && this.y < canvas_height) {
      ascii[this.y][this.x] = characters[this.c];
    }
  }
}

// SETUP
function setup() {
  create_canvas();
  mouse_x = canvas_width / 2;
  mouse_y = canvas_height / 2;
  particles = [];
  followers = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    followers.push(new Follower());
  }
}

// LOOP
function loop() {
  clear();
  for (let i = 0; i < NUM_PARTICLES; i++) {
    followers[i].update();
    followers[i].draw();
  }
  let new_particles = [];
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].update()) {
      new_particles.push(particles[i]);
      particles[i].draw();
    }
  }
  particles = new_particles;
  render();
  requestAnimationFrame(loop);
}

// MOUSE
window.addEventListener('mousemove', e => {
  mouse_x = floor(e.clientX / 8.4);
  mouse_y = floor(e.clientY / 14);
});

// START
window.addEventListener('load', () => {
  setup();
  loop();
});