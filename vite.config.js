import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: isSsrBuild
    ? { target: 'node18' }
    : {
        target: 'es2020',
        rollupOptions: { output: { manualChunks: { three: ['three'], r3f: ['@react-three/fiber'], motion: ['gsap', 'lenis'] } } },
        chunkSizeWarningLimit: 900,
      },
}))
