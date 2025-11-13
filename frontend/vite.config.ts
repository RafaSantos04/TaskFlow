import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
// import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@api": path.resolve(__dirname, "src/api"),
//       "@assets": path.resolve(__dirname, "src/assets"),
//       "@components": path.resolve(__dirname, "src/components"),
//       "@config": path.resolve(__dirname, "src/config"),
//       "@context": path.resolve(__dirname, "src/context"),
//       "@hooks": path.resolve(__dirname, "src/hooks"),
//       "@pages": path.resolve(__dirname, "src/pages"),
//       "@routes": path.resolve(__dirname, "src/routes"),
//       "@store": path.resolve(__dirname, "src/store"),
//       "@types": path.resolve(__dirname, "src/types"),
//       "@utils": path.resolve(__dirname, "src/utils")
//     }
//   }
// })
