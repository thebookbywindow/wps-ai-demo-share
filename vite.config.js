import { defineConfig } from 'vite';

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
          // Notify browser client to reload
          server.ws.send({
            type: 'full-reload'
          });
        }
      }
    }
  ]
});
