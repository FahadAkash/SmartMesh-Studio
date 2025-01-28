export interface ShaderConfig {
    vertexShader: string;
    fragmentShader: string;
    uniforms: Record<string, { value: unknown }>;
  }