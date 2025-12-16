import AlbumsService from '../services/albumsService.js';

export const AlbumsController = {
  // GET /api/v1/albums/csv
  // Descarga albums de jsonplaceholder, convierte a CSV y devuelve
  getAlbumsCSV: async (request, response) => {
    try {
      const csvContent = await AlbumsService.getAlbumsCSV();
      
      // Headers para descargar como CSV
      response.setHeader('Content-Type', 'text/csv; charset=utf-8');
      response.setHeader('Content-Disposition', 'attachment; filename="albums_15.csv"');
      
      response.send(csvContent);
    } catch (error) {
      console.log('Error al obtener CSV de albums:', error.message);
      response.status(500).json({ statusCode: 500, error: 'Error al descargar albums CSV' });
    }
  },
};

export default AlbumsController;
