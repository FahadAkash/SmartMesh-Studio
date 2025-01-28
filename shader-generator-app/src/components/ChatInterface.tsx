import { useState } from 'react';
import { OpenAI } from '@langchain/openai';
import { useShaderStore } from '../stores/shaderStore';

export const ChatInterface = () => {
  const [prompt, setPrompt] = useState('');
  const { setShaderConfig } = useShaderStore();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleGenerateShader = async () => {
    const llm = new OpenAI({
      openAIApiKey: apiKey,
      temperature: 0.7,
      modelName: 'gpt-4',
    });
    
    const response = await llm.invoke(`
      Generate GLSL shader code for: ${prompt}
      Return JSON format:
      {
        "vertex": "vertex shader code",
        "fragment": "fragment shader code",
        "uniforms": {"uniform_name": "type"}
      }
    `);

    const parsedShader = JSON.parse(response);
    setShaderConfig({
      vertexShader: parsedShader.vertex,
      fragmentShader: parsedShader.fragment,
      uniforms: Object.keys(parsedShader.uniforms).reduce((acc, key) => ({
        ...acc,
        [key]: { value: parsedShader.uniforms[key] }
      }), {})
    });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <textarea
        className="w-full p-2 text-white bg-gray-700 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter shader description..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        onClick={handleGenerateShader}
      >
        Generate Shader
      </button>
    </div>
  );
};