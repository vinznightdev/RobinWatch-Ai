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
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Structure for Neural Synapses
    interface NeuralNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseDir: number;
      baseColor: string;
    }

    interface SynapseSignal {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }

    let nodes: NeuralNode[] = [];
    let signals: SynapseSignal[] = [];

    const initNodes = () => {
      nodes = [];
      signals = [];
      const count = Math.min(45, Math.floor((width * height) / 32000));

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.5 + Math.random() * 2,
          pulse: Math.random(),
          pulseDir: Math.random() > 0.5 ? 0.005 : -0.005,
          baseColor: Math.random() > 0.6 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(148, 163, 184, 0.25)',
        });
      }
    };

    initNodes();

    // Periodically spawn a neural data transmission signal
    const spawnSignal = () => {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      
      // Find nearest nodes to keep signal paths short and highly structured
      const candidates: { idx: number; dist: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (i === fromIdx) continue;
        const dx = nodes[i].x - nodes[fromIdx].x;
        const dy = nodes[i].y - nodes[fromIdx].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          candidates.push({ idx: i, dist });
        }
      }

      if (candidates.length > 0) {
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        signals.push({
          fromIdx,
          toIdx: target.idx,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
          color: Math.random() > 0.5 ? '#10b981' : '#06b6d4',
        });
      }
    };

    // Spawn network pulses consistently
    const signalInterval = setInterval(spawnSignal, 1400);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint structural background grid for depth
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and Draw Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently at viewport edges
        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;

        // Animate slow organic breathing pulse
        node.pulse += node.pulseDir;
        if (node.pulse > 1 || node.pulse < 0.2) node.pulseDir *= -1;

        // Node Glow aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (1 + node.pulse * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = node.baseColor;
        ctx.fill();

        // Node Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = node.baseColor.includes('16, 185, 129') ? '#34d399' : '#94a3b8';
        ctx.fill();
      });

      // Draw mathematical connectome wires between close nodes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.12;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Update and Draw Synaptic Pulse signals
      signals.forEach((sig, idx) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          signals.splice(idx, 1);
          return;
        }

        const fromNode = nodes[sig.fromIdx];
        const toNode = nodes[sig.toIdx];

        if (fromNode && toNode) {
          // Linear interpolation for pulse path
          const px = fromNode.x + (toNode.x - fromNode.x) * sig.progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * sig.progress;

          // Outer glowing bloom
          ctx.save();
          ctx.shadowColor = sig.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(signalInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
