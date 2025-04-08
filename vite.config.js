import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude:['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', 'three-stdlib', 'three-mesh-bvh'],
          // 'models': ['./assets/3d/island.glb', './assets/3d/fox.glb', './assets/3d/plane.glb', './assets/3d/bird.glb'],
          // 'skies': ['./assets/3d/sky.glb', './assets/3d/sky_dawn.glb', './assets/3d/sky_night.glb']
        }
      }
    }
  }
})
