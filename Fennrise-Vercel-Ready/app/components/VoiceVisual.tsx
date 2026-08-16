"use client";

import { useEffect, useRef } from "react";
import styles from "./RelayVisual.module.css";

const vertexShaderSource = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

#define TAU 6.28318530718

vec3 gradientHash(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 234.6)),
    dot(p, vec3(269.5, 183.3, 198.3)),
    dot(p, vec3(169.5, 283.3, 156.9))
  );
  vec3 h = fract(sin(p) * 43758.5453123);
  float phi = acos(2.0 * h.x - 1.0);
  float theta = TAU * h.y;
  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
}

float quinticSmooth(float t) {
  float t2 = t * t;
  float t3 = t * t2;
  return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;

  float fx = floor(x);
  float fy = floor(y);
  float fz = floor(pz);
  float cx = ceil(x);
  float cy = ceil(y);
  float cz = ceil(pz);

  vec3 g000 = gradientHash(vec3(fx, fy, fz));
  vec3 g100 = gradientHash(vec3(cx, fy, fz));
  vec3 g010 = gradientHash(vec3(fx, cy, fz));
  vec3 g110 = gradientHash(vec3(cx, cy, fz));
  vec3 g001 = gradientHash(vec3(fx, fy, cz));
  vec3 g101 = gradientHash(vec3(cx, fy, cz));
  vec3 g011 = gradientHash(vec3(fx, cy, cz));
  vec3 g111 = gradientHash(vec3(cx, cy, cz));

  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));
  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));

  float sx = quinticSmooth(x - fx);
  float sy = quinticSmooth(y - fy);
  float sz = quinticSmooth(pz - fz);

  float lx00 = mix(d000, d100, sx);
  float lx10 = mix(d010, d110, sx);
  float lx01 = mix(d001, d101, sx);
  float lx11 = mix(d011, d111, sx);

  float ly0 = mix(lx00, lx10, sy);
  float ly1 = mix(lx01, lx11, sy);
  return amplitude * mix(ly0, ly1, sz);
}

float layeredNoise(vec2 p, float t) {
  float n = 0.0;
  float amp = 0.72;
  float freq = 1.9;
  for (int i = 0; i < 3; i++) {
    n += perlin3D(amp, freq, p.x, p.y, t);
    amp *= 0.24;
    freq *= 2.0;
  }
  return n;
}

float auroraBand(vec2 uv, float time, float offset, float width, float phase) {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 noiseUv = vec2(uv.x * aspect * 1.12, uv.y * 1.15);
  float noise = layeredNoise(noiseUv + vec2(offset, 0.0), time + phase);

  float baseWave = sin(uv.x * 5.4 + time * 0.78 + phase) * 0.032;
  float detailWave = sin(uv.x * 11.2 - time * 0.42 + phase * 1.65) * 0.012;
  float mouseBend = (uMouse.y - 0.5) * 0.025;
  float center = 0.5 + baseWave + detailWave + noise * 0.06 + mouseBend;

  float distanceToBand = abs(uv.y - center);
  return exp(-pow(distanceToBand / width, 2.15));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uTime * 0.3;

  float band1 = auroraBand(uv, t, 0.0, 0.032, 0.0);
  float band2 = auroraBand(uv, t * 0.92, 1.7, 0.048, 1.8);
  float band3 = auroraBand(uv, t * 0.78, 3.3, 0.068, 3.4);

  vec3 gold = vec3(0.957, 0.706, 0.0);
  vec3 warm = vec3(1.0, 0.86, 0.32);
  vec3 pale = vec3(1.0, 0.94, 0.68);

  vec3 color = vec3(0.0);
  color += gold * band3 * 0.18;
  color += warm * band2 * 0.36;
  color += pale * band1 * 0.68;

  float horizontalFade = smoothstep(0.0, 0.12, uv.x) * smoothstep(0.0, 0.12, 1.0 - uv.x);
  float verticalFade = smoothstep(0.08, 0.24, uv.y) * smoothstep(0.08, 0.24, 1.0 - uv.y);
  color *= horizontalFade * verticalFade;

  float alpha = clamp(length(color) * 0.78, 0.0, 0.82);
  gl_FragColor = vec4(color, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function RelayVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, "uTime");
    const resolutionUniform = gl.getUniformLocation(program, "uResolution");
    const mouseUniform = gl.getUniformLocation(program, "uMouse");

    let targetMouse = { x: 0.5, y: 0.5 };
    let currentMouse = { x: 0.5, y: 0.5 };
    let frame = 0;
    let visible = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = {
        x: (event.clientX - rect.left) / Math.max(rect.width, 1),
        y: 1 - (event.clientY - rect.top) / Math.max(rect.height, 1),
      };
    };

    const pointerLeave = () => {
      targetMouse = { x: 0.5, y: 0.5 };
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(canvas);

    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerleave", pointerLeave);
    resize();

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;

      resize();
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.045;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.045;

      gl.useProgram(program);
      gl.uniform1f(timeUniform, reducedMotion ? 0 : (now - startedAt) / 1000);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform2f(mouseUniform, currentMouse.x, currentMouse.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className={styles.shell} aria-label="Fennrise Relay flowing aurora visual">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
