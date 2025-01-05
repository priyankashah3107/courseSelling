import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
       target: "http://localhost:8080",
       changeOrigin: true
      }
   },
  },
  plugins: [react()],
});



// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import envCompatible from "vite-plugin-env-compatible"

// // https://vite.dev/config/
// export default defineConfig({
//   envPrefix: "VITE_",
//   server: {
//     port: 3000,
//     proxy: {
//       "/api": {
//        target: "http://localhost:8080",
//        changeOrigin: true
//       }
//    },
//   },
//   plugins: [react(), 
//     envCompatible()
//   ],
// });



