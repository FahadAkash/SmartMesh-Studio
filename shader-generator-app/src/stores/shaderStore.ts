import { create } from 'zustand';
import { ShaderConfig } from '../types';

interface ShaderState {
  shaderConfig: ShaderConfig | null;
  setShaderConfig: (config: ShaderConfig) => void;
}

export const useShaderStore = create<ShaderState>((set) => ({
  shaderConfig: null,
  setShaderConfig: (config) => set({ shaderConfig: config }),
}));