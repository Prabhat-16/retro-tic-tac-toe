import React, { useRef, useEffect } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    const numStars = 300; // How many stars to render

    // Create star objects with random positions and speeds
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // Size between 1 and 3
        speed: Math.random() * 0.5 + 0.2, // Speed between 0.2 and 0.7
      });
    }

    let animationFrameId;

    const draw = () => {
      // Clear the canvas on each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set star color
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Move the star
        star.y += star.speed;

        // If star goes off-screen, reset it to the top with a new random x position
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Request the next frame
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup function to stop the animation when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfield-canvas" />;
};

export default Starfield;