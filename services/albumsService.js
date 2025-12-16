import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALBUMS_CSV_PATH = path.join(__dirname, "..", "database", "albums_15.csv");
const JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/albums";

// Convierte array de albums a formato CSV
function convertToCSV(albums) {
	const header = "userId,id,title\n";
	const rows = albums
		.map((album) => `${album.userId},${album.id},"${album.title}"`)
		.join("\n");
	return header + rows;
}

export const AlbumsService = {
	// Obtiene albums de jsonplaceholder, convierte a CSV y guarda en archivo
	getAlbumsCSV: async () => {
		try {
			// Fetch de API externa
			const response = await fetch(JSONPLACEHOLDER_URL);
			if (!response.ok) {
				throw new Error(`Error fetcheando albums: ${response.status}`);
			}

			const albums = await response.json();

			// Tomar solo los 15 primeros
			const first15 = albums.slice(0, 15);

			// Convertir a CSV
			const csvContent = convertToCSV(first15);

			// Guardar en archivo
			await fs.writeFile(ALBUMS_CSV_PATH, csvContent, "utf-8");

			console.log("CSV de albums guardado en:", ALBUMS_CSV_PATH);

			return csvContent;
		} catch (error) {
			console.error("Error en AlbumsService.getAlbumsCSV:", error.message);
			throw error;
		}
	},
};

export default AlbumsService;
