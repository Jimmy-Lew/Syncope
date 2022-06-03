import { defineConfig } from 'vite'

// export default defineConfig({
//     build: {
//       rollupOptions: {
//         input: {
//           app: './index.html',
  
//           'static': './static',
//         },
//         output: {
//           // 2️⃣
//           entryFileNames: assetInfo => {
//             return assetInfo.name === 'static'
//                ? '[name]-[hash]'            
//                : 'assets/js/[name]-[hash].js'
//           }
//         },
//       },
//     },
// })