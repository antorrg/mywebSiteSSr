// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Esto puede ayudar a depurar en producción
  },
  ssr: {
    noExternal: ['styled-components', 'react-router-dom', 'react-redux'], // Ajusta según tus necesidades
  },
})