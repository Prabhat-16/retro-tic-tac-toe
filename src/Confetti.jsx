import React, { useRef, useEffect } from 'react';

// Retro color palette for the confetti
const retroColors = ['#ff3333', '#33ccff', '#00ff00', '#ffff00', '#ff6600'];

const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const numParticles = 200; // Number of confetti pieces

    // Create particle objects
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: canvas.width / 2, // Start from the center
        y: canvas.height / 2,
        size: Math.random() * 8 + 4, // Pixel size
        speedX: (Math.random() - 0.5) * 10, // Horizontal speed
        speedY: (Math.random() - 0.5) * 15, // Vertical speed (initial burst)
        color: retroColors[Math.floor(Math.random() * retroColors.length)],
        gravity: 0.2,
      });
    }

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Draw the particle (a simple rectangle for a pixel look)
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity; // Apply gravity

        // Remove particle if it's off-screen
        if (p.y > canvas.height) {
          particles.splice(index, 1);
        }
      });

      // Continue animation if there are still particles
      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="confetti-canvas" />;
};

export default Confetti;