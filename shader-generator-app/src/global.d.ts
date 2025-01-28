declare module 'three/addons/loaders/FBXLoader.js' {
    import { Loader, Group } from 'three';
  
    export class FBXLoader extends Loader {
      loadAsync(url: string): Promise<Group>;
    }
  }
  