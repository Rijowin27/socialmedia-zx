import { createServer } from 'vite';
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'socialmedia', 'public'))); // Serve static files from the public directory


// Vite server setup
createServer({
  root: path.join(__dirname, 'socialmedia'),
  server: {
    middlewareMode: 'ssr',
  },
}).then((vite) => {
  app.use(vite.middlewares);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'socialmedia', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
