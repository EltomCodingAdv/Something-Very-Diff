# Affirmation Heart

Affirmation Heart is a simple web application that displays uplifting affirmations within an interactive heart animation. Users can hover or touch the canvas to form a heart shape made of particles, revealing a new affirmation each time.

## How to Run

1. Clone the repository or download the files (`index.html`, `style.css`, `script.js`).
2. Open the `index.html` file in your preferred web browser.

That's it! You should see the Affirmation Heart animation and be able to interact with it.

## Features

- Interactive particle animation that forms a heart shape on hover (desktop) or touch (mobile).
- Displays one of over 50 random uplifting affirmations each time the heart is formed.
- Controls to:
    - **Add Particles:** Increase the number of particles in the animation.
    - **Change Colors:** Cycle through different color schemes for the particles.
    - **Reset Particles:** Return the particle count and positions to their initial state.
- Responsive design that adapts to different screen sizes.
- Tracks and displays the number of affirmations viewed during the session.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [Font Awesome](https://fontawesome.com/) for icons.

## Project Purpose

This project was created with the intention of providing a small, interactive, and visually soothing experience to promote mental wellbeing and positive self-talk. It serves as a gentle reminder of self-love, resilience, and the importance of positive affirmations.

## Code Structure

The project is organized into three main files:

- `index.html`: Contains the HTML structure of the web page, including the canvas for the animation and control buttons.
- `style.css`: Holds all the CSS rules for styling the page, including the layout, appearance of elements, and animations.
- `script.js`: Contains all the JavaScript logic for:
    - Setting up and managing the HTML5 canvas.
    - Creating and animating particles.
    - Handling user interactions (mouse hover, touch events).
    - Implementing the heart shape formation algorithm.
    - Managing and displaying affirmations.
    - Controlling UI elements like buttons and counters.

This separation of concerns (HTML for structure, CSS for presentation, and JavaScript for behavior) follows web development best practices, making the code more modular, maintainable, and easier to understand.

---
*Created with love to support mental wellbeing.*
