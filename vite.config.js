import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: true
  },
  plugins: [
    {
      name: 'sync-and-reload-templates',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('templates-inner.html')) {
          try {
            // Also keep index.html base64 in sync for single-file portability
            const inner = fs.readFileSync('templates-inner.html', 'utf8');
            const index = fs.readFileSync('index.html', 'utf8');
            const b64 = Buffer.from(inner, 'utf8').toString('base64');
            const updatedIndex = index.replace(
              /<script type="application\/octet-stream" id="templatesPayload">[\s\S]*?<\/script>/,
              () => `<script type="application/octet-stream" id="templatesPayload">${b64}</script>`
            );
            fs.writeFileSync('index.html', updatedIndex, 'utf8');
          } catch(e) {}

          // Notify browser client to reload
          server.ws.send({
            type: 'full-reload'
          });
        }
      }
    }
  ]
});
