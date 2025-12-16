import { Router } from 'express';
import { AlbumsController } from '../controllers/albumsController.js';

const router = Router();

// GET /api/v1/albums/csv
// Descarga y genera CSV de 15 primeros albums de jsonplaceholder
router.get('/csv', AlbumsController.getAlbumsCSV);

export default router;
