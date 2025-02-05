// Set up the canvas for background animation
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize canvas to fit window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array for storing dots
let dots = [];
let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Dot class
class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

// Create dots
function createDots() {
    for (let i = 0; i < 100; i++) {
        dots.push(new Dot(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

// Update and draw background dots
function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        dot.update();
        dot.draw();

        // Check if the dot is close to the cursor to make a connection
        const dx = dot.x - cursor.x;
        const dy = dot.y - cursor.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(cursor.x, cursor.y);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    });

    requestAnimationFrame(animateDots);
}

// Update cursor position
document.addEventListener('mousemove', (event) => {
    cursor.x = event.x;
    cursor.y = event.y;
});

// Pulsating effect on cursor click
document.addEventListener('click', () => {
    const cursorElement = document.querySelector('.cursor');
    cursorElement.classList.add('pulsate');
    setTimeout(() => cursorElement.classList.remove('pulsate'), 500);
});

// Create and style custom cursor
const cursorElement = document.createElement('div');
cursorElement.classList.add('cursor');
document.body.appendChild(cursorElement);

// Update custom cursor position
function updateCursor() {
    cursorElement.style.left = `${cursor.x - cursorElement.offsetWidth / 2}px`;
    cursorElement.style.top = `${cursor.y - cursorElement.offsetHeight / 2}px`;
    requestAnimationFrame(updateCursor);
}

createDots();
animateDots();
updateCursor();
