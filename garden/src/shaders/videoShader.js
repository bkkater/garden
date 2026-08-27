// Shader usado pelo ShaderPass.
// tDiffuse chega automaticamente com o frame anterior (o vídeo do TexturePass).

const videoShader = {
  uniforms: {
    tDiffuse: { value: null },
    uGridSize: { value: 72 },
    uDotSize: { value: 0.55 },
    uContrast: { value: 1.4 },
    uBrightness: { value: 0.08 },
    uEffectStrength: { value: 0.82 },
    uColor: { value: null },
    uTime: { value: 0 },
    uResolution: { value: null },
    uVideoSize: { value: null },
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uGridSize;
    uniform float uDotSize;
    uniform float uContrast;
    uniform float uBrightness;
    uniform float uEffectStrength;
    uniform vec3 uColor;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uVideoSize;

    varying vec2 vUv;

    // Matriz Bayer 4x4. No GLSL, mat4 é preenchida por COLUNA.
    float bayer4(vec2 coord) {
      mat4 m = mat4(
        0.0, 12.0,  3.0, 15.0,
        8.0,  4.0, 11.0,  7.0,
        2.0, 14.0,  1.0, 13.0,
       10.0,  6.0,  9.0,  5.0
      );
      int x = int(mod(coord.x, 4.0));
      int y = int(mod(coord.y, 4.0));
      return m[x][y] / 16.0;
    }

    // Recorta o vídeo como object-fit: cover, sem distorcer.
    vec2 coverUV(vec2 uv) {
      float canvasAspect = uResolution.x / max(uResolution.y, 1.0);
      float videoAspect = uVideoSize.x / max(uVideoSize.y, 1.0);
      vec2 ratio = vec2(1.0);

      if (canvasAspect > videoAspect) {
        ratio.y = videoAspect / canvasAspect;
      } else {
        ratio.x = canvasAspect / videoAspect;
      }

      return (uv - 0.5) * ratio + 0.5;
    }

    vec3 applyContrast(vec3 color) {
      return clamp((color - 0.5) * uContrast + 0.5 + uBrightness, 0.0, 1.0);
    }

    void main() {
      vec2 uv = coverUV(vUv);

      vec3 original = texture2D(tDiffuse, uv).rgb;

      // Grade com células quadradas na tela, não no UV.
      float canvasAspect = uResolution.x / max(uResolution.y, 1.0);
      vec2 grid = vec2(uGridSize, uGridSize / canvasAspect);

      // Pixelização: amostra só o centro de cada célula.
      vec2 pixelUV = (floor(uv * grid) + 0.5) / grid;
      vec3 pixelColor = applyContrast(texture2D(tDiffuse, pixelUV).rgb);

      float lum = dot(pixelColor, vec3(0.299, 0.587, 0.114));

      // Halftone: o raio do ponto segue o brilho do pixel.
      vec2 cell = fract(uv * grid) - 0.5;
      float dist = length(cell);
      float radius = lum * uDotSize * 0.72;
      float dots = 1.0 - smoothstep(radius, radius + 0.035, dist);

      // Dithering ordenado sobre a luminância.
      float dither = bayer4(gl_FragCoord.xy);
      float ditherMask = step(dither, lum);

      vec3 ink = vec3(0.04, 0.035, 0.03);
      vec3 tinted = mix(pixelColor, uColor, 0.22 + 0.08 * sin(uTime * 0.35));
      vec3 dotted = mix(ink, tinted, dots);
      vec3 effected = mix(dotted, mix(ink, uColor, ditherMask), 0.28);

      vec3 finalColor = mix(original, effected, uEffectStrength);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
}

export default videoShader
