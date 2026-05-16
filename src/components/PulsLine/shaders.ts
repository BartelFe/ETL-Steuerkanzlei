export const vertexShader = /* glsl */ `
  precision highp float;

  attribute float aT;
  attribute float aSide;

  uniform float uTime;
  uniform float uTargetSection;
  uniform float uLength;
  uniform float uThickness;
  uniform vec2  uMouse;
  uniform float uMagnetStrength;

  varying float vT;
  varying float vMagnetic;
  varying float vSide;

  float shapeHero(float t, float tm) {
    float wave = sin(t * 14.0 + tm * 0.7) * 0.12;
    float peakPhase = mod(t * 4.5 - tm * 0.2, 1.0);
    float peak = exp(-pow(peakPhase - 0.5, 2.0) * 70.0) * 0.55;
    return wave + peak * 0.8;
  }

  float shapeManifest(float t, float tm) {
    return sin(t * 3.1415 + tm * 0.18) * 0.45 + sin(t * 8.0 - tm * 0.1) * 0.05;
  }

  float shapeAudiences(float t, float tm) {
    float y = 0.0;
    for (int i = 0; i < 4; i++) {
      float c = (float(i) + 0.5) / 4.0;
      float w = exp(-pow(t - c, 2.0) * 95.0);
      y += w * (0.55 + sin(tm * 0.6 + float(i)) * 0.06);
    }
    return y - 0.22;
  }

  float shapeServices(float t, float tm) {
    return sin(t * 24.0 + tm * 0.4) * 0.16
         + sin(t * 6.0  - tm * 0.2) * 0.18;
  }

  float shapeProcess(float t, float tm) {
    float steps = floor(t * 4.0);
    float frac = fract(t * 4.0);
    float ease = smoothstep(0.7, 1.0, frac);
    return mix(steps * 0.18, (steps + 1.0) * 0.18, ease) - 0.27
         + sin(tm * 0.5) * 0.015;
  }

  float shapeTrust(float t, float tm) {
    return sin(tm * 0.25 + t * 1.2) * 0.06;
  }

  float shapeTeam(float t, float tm) {
    float y = 0.0;
    for (int i = 0; i < 3; i++) {
      float c = (float(i) + 0.5) / 3.0;
      float w = exp(-pow(t - c, 2.0) * 50.0);
      y += sin((t - c) * 16.0 + tm * 0.6) * w * 0.32;
    }
    return y;
  }

  float shapeCareer(float t, float tm) {
    return pow(t, 1.3) * 0.6 - 0.30
         + sin(t * 20.0 + tm * 0.5) * 0.05;
  }

  float shapeContact(float t, float tm) {
    float p = t * 6.2832;
    return sin(p) * 0.32
         + cos(p * 2.3 + tm * 0.2) * 0.18
         + sin(p * 3.7 - tm * 0.1) * 0.08;
  }

  float pick(float t, float tm, float idx) {
    if (idx < 0.5) return shapeHero(t, tm);
    if (idx < 1.5) return shapeManifest(t, tm);
    if (idx < 2.5) return shapeAudiences(t, tm);
    if (idx < 3.5) return shapeServices(t, tm);
    if (idx < 4.5) return shapeProcess(t, tm);
    if (idx < 5.5) return shapeTrust(t, tm);
    if (idx < 6.5) return shapeTeam(t, tm);
    if (idx < 7.5) return shapeCareer(t, tm);
    return shapeContact(t, tm);
  }

  float getShape(float t, float tm, float sec) {
    float a = floor(sec);
    float b = a + 1.0;
    float blend = smoothstep(0.0, 1.0, fract(sec));
    return mix(pick(t, tm, a), pick(t, tm, b), blend);
  }

  void main() {
    float x = (aT - 0.5) * uLength;
    float y = getShape(aT, uTime, uTargetSection);

    vec2 mw = vec2(uMouse.x * uLength * 0.5, uMouse.y * 0.8);
    float dx = x - mw.x;
    float dy = y - mw.y;
    float dist = sqrt(dx * dx + dy * dy);
    float pull = exp(-dist * 1.4) * uMagnetStrength;
    y += pull * (mw.y - y) * 0.9;

    vec2 center = vec2(x, y);

    float dT = 1.0 / 256.0;
    float xN = ((aT + dT) - 0.5) * uLength;
    float yN = getShape(aT + dT, uTime, uTargetSection);
    vec2 tangent = normalize(vec2(xN - x, yN - y));
    vec2 normal  = vec2(-tangent.y, tangent.x);

    float taper = sin(aT * 3.1415);
    float thickness = uThickness * (0.4 + taper * 0.6) * (1.0 + pull * 1.2);

    vec2 offset = normal * thickness * aSide;
    vec3 finalPos = vec3(center + offset, 0.0);

    vT = aT;
    vSide = aSide;
    vMagnetic = pull;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform float uInvert;

  varying float vT;
  varying float vSide;
  varying float vMagnetic;

  void main() {
    float mixVal = sin(vT * 7.0 + uTime * 0.25) * 0.5 + 0.5;
    vec3 color = mix(uColorA, uColorB, mixVal);

    float edge = 1.0 - abs(vSide);
    edge = smoothstep(0.0, 0.7, edge);

    vec3 hot = vec3(1.0, 0.85, 0.55);
    color = mix(color, hot, vMagnetic * 0.8);

    if (uInvert > 0.5) {
      color = vec3(0.06, 0.14, 0.12);
    }

    float alpha = edge * (0.92 + vMagnetic * 0.4);

    gl_FragColor = vec4(color, alpha);
  }
`;
