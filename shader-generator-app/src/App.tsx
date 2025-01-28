import { ModelViewer } from './components/ModelViewer';
import { ChatInterface } from './components/ChatInterface';
import { ShaderPreview } from './components/ShaderPreview';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-2 gap-4 p-4">
      <div className="col-span-1">

      <ModelViewer />
      </div>
      <div className="col-span-1 space-y-4">
        <ChatInterface />
        <ShaderPreview />
       
        
      </div>
    </div>
  );
}