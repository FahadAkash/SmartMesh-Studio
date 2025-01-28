/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three';

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10;
    return () => controls.dispose();
  }, [camera, gl]);
  return null;
};

export const ModelViewer = () => {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadModel = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const loader = new FBXLoader();
      const url = URL.createObjectURL(file);
      const loadedModel = await loader.loadAsync(url);
      
      // Cleanup previous model and URL
      if (model) {
        URL.revokeObjectURL(url);
        model.traverse(obj => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }

      // Set up materials for new model
      loadedModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 0.5,
            roughness: 0.5,
          });
        }
      });

      setModel(loadedModel);
    } catch (err) {
      setError('Failed to load FBX file. Please ensure it\'s a valid FBX model.');
      console.error('FBX loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadModel(file);
    }
  };

  return (
    <div className="h-full w-full border-2 border-gray-700 rounded-lg relative">
      {/* File upload button */}
      <div className="absolute top-2 left-2 z-10">
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
          Upload FBX
          <input
            type="file"
            ref={fileInputRef}
            accept=".fbx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Status messages */}
      {loading && (
        <div className="absolute top-2 right-2 bg-gray-800 text-white px-4 py-2 rounded">
          Loading model...
        </div>
      )}
      {error && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {model && (
          <primitive 
            object={model} 
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
          />
        )}
        
        <gridHelper args={[10, 10]} />
      </Canvas>
    </div>
  );
};