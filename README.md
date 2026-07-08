# 🎲 Equalzi

Equalzi is a fast-paced, addictive React-based dice game inspired by Tenzies, but with an algebraic twist! Players must think quickly to select dice combinations that add up precisely to a randomly generated target sum before the countdown timer runs out.

---

## 🚀 Live Demo
- **Play Here:** [Live Link](https://equalzi.netlify.app/)

---

## 🎮 How to Play

1. **Check the Target:** Look at the target roll sum displayed at the top (e.g., `Target: 30`).
2. **Roll & Select:** Click on individual dice to **hold** them (they will turn green). Held dice lock their values.
3. **Keep Rolling:** Click the **Roll** button to randomize all unheld dice to try and find the values you need.
4. **Beat the Clock:** You have exactly **20 seconds** to make the sum of your held (green) dice equal the target number.
5. **Win or Lose:** - If the sum matches exactly in time, you win and get a confetti celebration! 🎉
   - If the timer hits `0s`, it's Game Over! 😢

---

## 🛠️ Tech Stack & Features

### Core Technologies
* **React (Hooks):** Built using functional components featuring `useState`, `useEffect`, and `useRef` for optimal lifecycle management.
* **CSS Grid & Flexbox:** A completely responsive UI card component perfectly centered within the viewport bounds.

### NPM Packages Used
* [`nanoid`](https://www.npmjs.com/package/nanoid) — For generating cryptographically secure, unique keys for individual die elements.
* [`react-confetti`](https://www.npmjs.com/package/react-confetti) — For the rewarding full-screen immersive victory animations.

---

## 🔧 Installation & Setup

To run Equalzi locally on your machine, follow these quick steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/equalzi.git](https://github.com/your-username/equalzi.git)

   ```

2. **Navigate into the project folder:**
    ```bash
    cd equalzi

    ```


3. **Install dependencies:**
    ```bash
    npm install

    ```


4. **Start the local development server:**
    ```bash
    npm run dev

    ```


*Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port specified in your terminal) to play!*

---

## 📝 Accessibility (A11y)

* Includes `aria-live="polite"` state alerts tucked inside an `.sr-only` wrapper so screen readers instantly announce game results (Wins/Losses) smoothly without visual disruptions.
* Uses `useRef` to auto-focus the action button as soon as a game ends, enabling seamless keyboard-only replay loops.
