import { config } from './config/index.js';
import app from './app.js';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Ambiente: ${config.nodeEnv}`);
  console.log(`URI MongoDB: ${config.mongoUri}`);
});
