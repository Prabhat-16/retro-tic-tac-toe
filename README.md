# 🎮 Retro Tic-Tac-Toe

A nostalgic, retro-styled Tic-Tac-Toe game built with React and Vite, featuring an animated starfield background, sound effects, and pixel-perfect animations.

![Retro Tic-Tac-Toe Game](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.2-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎯 Classic Gameplay**: Traditional 3x3 Tic-Tac-Toe with modern React implementation
- **🌟 Animated Starfield**: Dynamic space-themed background with moving stars
- **🎵 Sound Effects**: Immersive audio feedback for moves and victories
- **🏆 Victory Celebrations**: Fun, retro-themed win messages and visual effects
- **👥 Player Customization**: Enter custom names for both players
- **📚 Move History**: Track and replay all game moves
- **🎨 Retro Aesthetics**: Pixel-perfect design with nostalgic color schemes
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- **OR** Docker (for containerized development)

### Installation

#### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/retro-tic-tac-toe.git
   cd retro-tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game!

#### Option 2: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/retro-tic-tac-toe.git
   cd retro-tic-tac-toe
   ```

2. **Build and run with Docker**
   ```bash
   # Build the Docker image
   docker build -t retro-tic-tac-toe .
   
   # Run the container
   docker run -p 5173:5173 retro-tic-tac-toe
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` to play the game!

**Docker Compose Alternative:**
```bash
# Run with Docker Compose (if you have it installed)
docker-compose up --build
```

## 🎮 How to Play

1. **Game Setup**: Enter names for Player X and Player O (or use defaults)
2. **Take Turns**: Players alternate placing X's and O's on the 3x3 grid
3. **Win Condition**: Get three of your symbols in a row (horizontally, vertically, or diagonally)
4. **Game Over**: When someone wins or the board is full (draw), the game ends
5. **Replay**: Use the move history to review the game or start a new one

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm run deploy` - Deploy to GitHub Pages

## 🏗️ Project Structure

```
retro-tic-tac-toe/
├── src/
│   ├── App.jsx          # Main game logic and components
│   ├── Starfield.jsx    # Animated starfield background
│   ├── Confetti.jsx     # Victory celebration effects
│   ├── App.css          # Game styling and animations
│   └── main.jsx         # Application entry point
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🎨 Technical Features

### Core Components
- **Game Setup**: Player name input and game initialization
- **Game Board**: Interactive 3x3 grid with click handling
- **Move History**: Track and replay functionality
- **Status Display**: Real-time game state updates

### Visual Effects
- **Starfield Animation**: Canvas-based star movement with parallax effect
- **Confetti Celebration**: Particle system for victory animations
- **Glitch Effects**: Retro-style visual feedback on game events
- **Responsive Design**: Mobile-first approach with CSS Grid

### Audio System
- **Sound Effects**: Place sounds for moves and victory fanfares
- **Audio Management**: Web Audio API integration for immersive gameplay

## 🌟 Key Technologies

- **React 19.1.1** - Modern React with hooks and functional components
- **Vite 7.1.2** - Fast build tool and development server
- **Canvas API** - Custom animations and visual effects
- **CSS3** - Advanced styling with animations and responsive design
- **ESLint** - Code quality and consistency

## 🚀 Deployment

### GitHub Pages
The project is configured for easy deployment to GitHub Pages:

```bash
npm run deploy
```

### Docker Deployment
Deploy using Docker for consistent environments:

```bash
# Build production image
docker build -t retro-tic-tac-toe:prod .

# Run production container
docker run -p 80:80 retro-tic-tac-toe:prod
```

### Manual Deployment
Build the project and serve the static files:

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Inspired by classic arcade games and retro aesthetics
- Built with modern web technologies for the best user experience
- Special thanks to the React and Vite communities

## 📞 Support

If you have any questions or suggestions, please open an issue on GitHub or reach out to the maintainers.

---

**Enjoy the game and may the best player win! 🎯✨**
