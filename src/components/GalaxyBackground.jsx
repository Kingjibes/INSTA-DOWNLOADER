import React, { useEffect, useRef } from 'react';

    const GalaxyBackground = () => {
      const canvasRef = useRef(null);

      useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.1, 
            dy: (Math.random() - 0.5) * 0.1, 
          });
        }

        const drawStar = (star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
        };

        const updateStar = (star) => {
          star.x += star.dx;
          star.y += star.dy;

          if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
          if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
          
          star.alpha += (Math.random() -0.5) * 0.05;
          if(star.alpha < 0.2) star.alpha = 0.2;
          if(star.alpha > 1) star.alpha = 1;

        };

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
          );
          gradient.addColorStop(0, 'rgba(25, 20, 50, 1)'); 
          gradient.addColorStop(0.3, 'rgba(40, 25, 70, 1)'); 
          gradient.addColorStop(0.6, 'rgba(15, 10, 40, 1)'); 
          gradient.addColorStop(1, 'rgba(5, 3, 15, 1)'); 
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          stars.forEach(star => {
            drawStar(star);
            updateStar(star);
          });
          animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          stars.length = 0; 
          for (let i = 0; i < numStars; i++) {
            stars.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.random() * 1.5 + 0.5,
              alpha: Math.random() * 0.5 + 0.5,
              dx: (Math.random() - 0.5) * 0.1,
              dy: (Math.random() - 0.5) * 0.1,
            });
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
    };

    export default GalaxyBackground;