"use client";

import React, { useEffect, useRef } from "react";

export default function Interactive3DTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Normalize mouse coordinates to range [-1, 1] relative to center
      mouseRef.current.targetX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.targetY = ((e.clientY - rect.top) / height) * 2 - 1;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Grid configuration
    const rows = 26;
    const cols = 26;
    const spacing = 32;
    const focalLength = 380;

    let time = 0;

    // Particle class
    class Point3D {
      x: number;
      y: number;
      z: number;
      origX: number;
      origY: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.z = 0;
        this.origX = x;
        this.origY = y;
      }

      update(time: number, mouseX: number, mouseY: number, mouseActive: boolean) {
        // Base sine wave movement
        const distFromCenter = Math.sqrt(this.origX * this.origX + this.origY * this.origY);
        let wave = Math.sin(time * 1.8 + distFromCenter * 0.015) * 18;

        // Mouse displacement
        if (mouseActive) {
          // Project mouse coordinates to 3D space approximate
          const targetX3D = mouseX * (width / 2);
          const targetY3D = mouseY * (height / 2);

          const dx = this.origX - targetX3D;
          const dy = this.origY - targetY3D;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distToMouse < 280) {
            // Push particles down/up based on mouse proximity
            const force = (280 - distToMouse) / 280;
            wave += Math.sin(time * 4 - distToMouse * 0.04) * 35 * force;
          }
        }

        this.z = wave;
      }

      project(rotateX: number, rotateY: number) {
        // Rotate around Y axis (horizontal rotation)
        let x1 = this.x * Math.cos(rotateY) - this.z * Math.sin(rotateY);
        let z1 = this.x * Math.sin(rotateY) + this.z * Math.cos(rotateY);

        // Rotate around X axis (vertical rotation)
        let y2 = this.y * Math.cos(rotateX) - z1 * Math.sin(rotateX);
        let z2 = this.y * Math.sin(rotateX) + z1 * Math.cos(rotateX);

        // Perspective projection
        const scale = focalLength / (focalLength + z2 + 250);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        return { x: projX, y: projY, scale, z: z2 };
      }
    }

    // Initialize points
    const points: Point3D[] = [];
    const startX = -((cols - 1) * spacing) / 2;
    const startY = -((rows - 1) * spacing) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push(new Point3D(startX + c * spacing, startY + r * spacing));
      }
    }

    // Mouse easing
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      time += 0.01;

      // Ease mouse coordinates
      currentMouseX += (mouseRef.current.targetX - currentMouseX) * 0.08;
      currentMouseY += (mouseRef.current.targetY - currentMouseY) * 0.08;

      // Rotation angles based on mouse or gentle default floating
      const rotY = currentMouseX * 0.22;
      const rotX = -0.55 + currentMouseY * 0.12; // tilted perspective

      // Update points
      points.forEach((p) => p.update(time, currentMouseX, currentMouseY, mouseRef.current.active));

      // Project points
      const projected = points.map((p) => p.project(rotX, rotY));

      // Draw grid lines
      ctx.lineWidth = 0.55;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p1 = projected[idx];

          // Skip if out of bounds or negative scale
          if (p1.scale <= 0) continue;

          // Connect to right neighbor
          if (c < cols - 1) {
            const p2 = projected[idx + 1];
            if (p2.scale > 0) {
              const alpha = Math.min(p1.scale, p2.scale) * 0.16;
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Connect to bottom neighbor
          if (r < rows - 1) {
            const p2 = projected[idx + cols];
            if (p2.scale > 0) {
              const alpha = Math.min(p1.scale, p2.scale) * 0.16;
              ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particle dots
      points.forEach((p, idx) => {
        const proj = projected[idx];
        if (proj.scale <= 0) return;

        // Size based on depth
        const radius = Math.max(0.45, proj.scale * 1.4);
        const alpha = proj.scale * 0.38;

        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-45 dark:opacity-30"
    />
  );
}
