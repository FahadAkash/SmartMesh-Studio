import { useShaderStore } from '../stores/shaderStore';

export const ShaderPreview = () => {
  const { shaderConfig } = useShaderStore();

  return (
    <div className="h-64 bg-gray-900 rounded-lg p-4 overflow-auto">
      <h3 className="text-white mb-2">Vertex Shader</h3>
      <pre className="text-sm text-green-400">{shaderConfig?.vertexShader}</pre>
      <h3 className="text-white mt-4 mb-2">Fragment Shader</h3>
      <pre className="text-sm text-blue-400">{shaderConfig?.fragmentShader}</pre>
    </div>
  );
};