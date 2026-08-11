import React, { useEffect, useRef } from 'react';

export const GlowingWiresCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initWires();
    };

    window.addEventListener('resize', handleResize);

    // Structure for Wires and Pulse particles
    interface NodePoint {
      x: number;
      y: number;
    }

    interface Wire {
      points: NodePoint[];
      color: string;
      glowColor: string;
      pulseProgress: number;
      pulseSpeed: number;
      pulseSize: number;
    }

    let wires: Wire[] = [];

    const initWires = () => {
      wires = [];
      const cols = 6;
      const rows = 5;
      const cellW = width / cols;
      const cellH = height / rows;

      // Generate robotic wire tracks across the screen
      for (let i = 0; i < 18; i++) {
        const startX = Math.floor(Math.random() * cols) * cellW + cellW / 2;
        const startY = Math.floor(Math.random() * rows) * cellH + cellH / 2;

        const points: NodePoint[] = [{ x: startX, y: startY }];
        let currX = startX;
        let currY = startY;

        const segments = Math.floor(Math.random() * 4) + 3;
        for (let s = 0; s < segments; s++) {
          const isHorizontal = Math.random() > 0.5;
          const distance = (Math.floor(Math.random() * 2) + 1) * 120;
          const direction = Math.random() > 0.5 ? 1 : -1;

          if (isHorizontal) {
            currX = Math.min(Math.max(20, currX + distance * direction), width - 20);
          } else {
            currY = Math.min(Math.max(20, currY + distance * direction), height - 20);
          }
          points.push({ x: currX, y: currY });
        }

        const isCyan = Math.random() > 0.4;
        wires.push({
          points,
          color: isCyan ? 'rgba(0, 255, 136, 0.15)' : 'rgba(157, 0, 255, 0.15)',
          glowColor: isCyan ? '#00ff88' : '#9d00ff',
          pulseProgress: Math.random(),
          pulseSpeed: 0.002 + Math.random() * 0.003,
          pulseSize: 3 + Math.random() * 4,
        });
      }
    };

    initWires();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render wires
      wires.forEach((wire) => {
        if (wire.points.length < 2) return;

        // Draw base wire path
        ctx.beginPath();
        ctx.moveTo(wire.points[0].x, wire.points[0].y);
        for (let p = 1; p < wire.points.length; p++) {
          ctx.lineTo(wire.points[p].x, wire.points[p].y);
        }
        ctx.strokeStyle = wire.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw node junctions
        wire.points.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = wire.glowColor;
          ctx.globalAlpha = 0.4;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });

        // Calculate position of traveling electric pulse
        wire.pulseProgress += wire.pulseSpeed;
        if (wire.pulseProgress > 1) wire.pulseProgress = 0;

        // Find current point along multi-segment polyline
        let totalLen = 0;
        const segLengths: number[] = [];
        for (let i = 0; i < wire.points.length - 1; i++) {
          const dx = wire.points[i + 1].x - wire.points[i].x;
          const dy = wire.points[i + 1].y - wire.points[i].y;
          const len = Math.sqrt(dx * dx + dy * dy);
          segLengths.push(len);
          totalLen += len;
        }

        let targetDist = wire.pulseProgress * totalLen;
        let pulseX = wire.points[0].x;
        let pulseY = wire.points[0].y;

        let accumulated = 0;
        for (let i = 0; i < segLengths.length; i++) {
          if (accumulated + segLengths[i] >= targetDist) {
            const segRatio = (targetDist - accumulated) / segLengths[i];
            pulseX = wire.points[i].x + (wire.points[i + 1].x - wire.points[i].x) * segRatio;
            pulseY = wire.points[i].y + (wire.points[i + 1].y - wire.points[i].y) * segRatio;
            break;
          }
          accumulated += segLengths[i];
        }

        // Draw glowing electrical pulse particle
        ctx.save();
        ctx.shadowColor = wire.glowColor;
        ctx.shadowBlur = 12;

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, wire.pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Outer glow aura
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, wire.pulseSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = wire.glowColor;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
