import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Serves api/ai.ts during `npm run dev`, the same handler that deploys as a serverless function. */
function aiApi(): Plugin {
  return {
    name: 'elmiron-ai-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      for (const k of ['ANTHROPIC_API_KEY', 'AI_DOCTOR_MODEL']) if (env[k] && !process.env[k]) process.env[k] = env[k];
      server.middlewares.use('/api/ai', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/api/ai.ts');
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const request = new Request('http://localhost/api/ai', {
            method: req.method,
            headers: { 'content-type': 'application/json' },
            body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
          });
          const response: Response = req.method === 'POST' ? await mod.POST(request) : await mod.GET();
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(await response.text());
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: (e as Error).message }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), aiApi()],
  base: './',
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split vendor code, curriculum content and the design screens so no single file is huge.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('/src/content/courses-')) return 'curriculum';
          if (id.includes('/src/screens/generated/')) return 'design-screens';
        },
      },
    },
  },
});
