// Canvas setup
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const messageEl = document.getElementById('message');
const counterEl = document.getElementById('counter');

// Set canvas to full container size
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Affirmations array (50+ uplifting messages)
const affirmations = [
    "You are loved exactly as you are",
    "Your feelings are valid and important",
    "This moment is temporary - you've survived 100% of your bad days",
    "You are stronger than you realize",
    "Your presence makes a difference in this world",
    "It's okay to not be okay - be gentle with yourself",
    "You are worthy of love and belonging",
    "Your journey is unique and valuable",
    "Every breath is a new beginning",
    "You have survived everything so far - you will survive this too",
    "Your mind is powerful - you can overcome these thoughts",
    "You are not alone - others care and understand",
    "Progress is not linear - small steps still move you forward",
    "You deserve kindness, especially from yourself",
    "Your resilience is inspiring",
    "This too shall pass - hold on to hope",
    "You are capable of amazing things",
    "Your existence matters",
    "It's okay to ask for help when you need it",
    "You are more than your current struggles",
    "Today is a new day with new possibilities",
    "Your courage is greater than your fear",
    "You have the strength to get through this",
    "Be proud of yourself for how far you've come",
    "You are deserving of peace and happiness",
    "Your value isn't defined by productivity",
    "Healing isn't linear - honor your process",
    "You are allowed to take up space",
    "Your best is enough, whatever that looks like today",
    "You have overcome challenges before - you can do it again",
    "Your presence is a gift to the world",
    "You are worthy of self-compassion",
    "It's okay to rest - your body and mind need it",
    "You are braver than you believe",
    "Your story isn't over yet - keep going",
    "You are enough, just as you are",
    "Your feelings don't define your worth",
    "Every small step forward is progress",
    "You have survived all your hardest days - you're still here",
    "Your light matters, even when it feels dim",
    "You are stronger than this moment",
    "Your journey has purpose",
    "You deserve to feel safe and at peace",
    "Healing takes time - be patient with yourself",
    "You are worthy of love, especially self-love",
    "Your existence makes a difference",
    "You have unique gifts to offer the world",
    "This feeling will pass - hold on to hope",
    "You are resilient beyond measure",
    "Your mental health is a priority - honor it",
    "You are deserving of joy",
    "Your strength is inspiring",
    "Tomorrow is a new opportunity",
    "You are a beautiful work in progress",
    "Your worth is unconditional"
];

let affirmationCounter = 0;
let currentAffirmation = "";
let lastAffirmationIndex = -1;

// Particle class
class Particle {
    constructor() {
        this.reset();
        this.baseSize = Math.random() * 4 + 2;
        this.size = this.baseSize;
        this.hue = Math.random() * 360;
        this.targetHue = this.hue;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.targetX = this.x;
        this.targetY = this.y;
        this.size = Math.random() * 4 + 2;
        this.formingShape = false;
        this.hue = Math.random() * 360;
        this.targetHue = this.hue;
    }

    update(mouseX, mouseY, mouseInCanvas) {
        // Move towards target position
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        this.x += dx * 0.05;
        this.y += dy * 0.05;

        // Add some random motion
        if (!mouseInCanvas || Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            this.x += this.vx;
            this.y += this.vy;
        }

        // Keep particles within canvas
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Adjust size for effect
        this.size = this.baseSize * (0.8 + 0.4 * Math.sin(Date.now() * 0.001));

        // Gradually shift color to target
        if (Math.abs(this.hue - this.targetHue) > 1) {
            this.hue += (this.targetHue - this.hue) * 0.05;
        } else {
            this.hue = this.targetHue;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 0.8)`;
        ctx.fill();

        // Add a glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 0.2)`;
        ctx.fill();
    }
}

// Create particles
const particles = [];
const particleCount = 150;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Interaction variables
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let mouseInCanvas = false;

// Mouse event handlers
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseInCanvas = true;
});

canvas.addEventListener('mouseleave', () => {
    mouseInCanvas = false;
    resetParticles();
});

// Touch event handlers for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
    mouseInCanvas = true;
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
    mouseInCanvas = true;
}, { passive: false });

canvas.addEventListener('touchend', () => {
    mouseInCanvas = false;
    resetParticles();
});

// Reset particles to random positions
function resetParticles() {
    particles.forEach(p => {
        p.targetX = Math.random() * canvas.width;
        p.targetY = Math.random() * canvas.height;
        p.formingShape = false;
    });
}

// Get a random affirmation
function getRandomAffirmation() {
    // Get a random index that's different from the last one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === lastAffirmationIndex);

    lastAffirmationIndex = newIndex;
    currentAffirmation = affirmations[newIndex];
    affirmationCounter++;
    counterEl.textContent = affirmationCounter;

    return currentAffirmation;
}

// Heart shape formation
function formHeartShape() {
    const centerX = mouseX;
    const centerY = mouseY;
    const heartSize = Math.min(canvas.width, canvas.height) * 0.2;
    const angleStep = Math.PI * 2 / particles.length;

    particles.forEach((p, i) => {
        const angle = angleStep * i;

        // Heart parametric equations
        const t = angle - Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

        // Scale and position
        p.targetX = centerX + (x * heartSize) / 16;
        p.targetY = centerY + (y * heartSize) / 16;
        p.formingShape = true;
    });

    // Show new random affirmation
    messageEl.textContent = getRandomAffirmation();
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Form heart if mouse is in canvas
    if (mouseInCanvas) {
        formHeartShape();
    }

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
                const opacity = 1 - distance / 80;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `hsla(${(p1.hue + p2.hue)/2}, 70%, 70%, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // Update and draw particles
    particles.forEach(p => {
        p.update(mouseX, mouseY, mouseInCanvas);
        p.draw();
    });

    requestAnimationFrame(animate);
}

// Control buttons
document.getElementById('addParticles').addEventListener('click', () => {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }
});

document.getElementById('changeColor').addEventListener('click', () => {
    particles.forEach(p => {
        p.targetHue = (p.targetHue + 120 + Math.random() * 60) % 360;
    });
});

document.getElementById('resetBtn').addEventListener('click', () => {
    while (particles.length > particleCount) {
        particles.pop();
    }

    particles.forEach(p => p.reset());
    resetParticles();
});

// Start with a random affirmation
messageEl.textContent = getRandomAffirmation();

// Start animation
animate();
