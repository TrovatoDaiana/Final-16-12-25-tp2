# Entrega Final Taller de Programación

**nombre_alumno:** <DAIANA ANTONELLA TROVATO>
**link:** <https://github.com/TrovatoDaiana/Final-16-12-25-tp2>

## Variables de entorno
Use el archivo `.env.example` como guía. Copie/cree un `.env.dev` con sus valores reales.

- `NODE_ENV`: entorno de ejecución (development)
- `PORT`: puerto del servidor (3000)
- `DB_PROVIDER`: proveedor de base de datos (mongo)
- `MONGO_URI`: cadena de conexión de MongoDB Atlas (con user, pass, cluster y db)
- `JWT_SECRET`: secreto para firmar tokens JWT (dev)
- `AUTH_STRATEGY`: estrategia de auth (`jwt` | `api-key` | `none`)
- `API_KEY`: (opcional) si se usa `api-key`

## Pasos de ejecución
1. Instalar dependencias
```bash
npm install
```
2. Crear `.env.dev` tomando como referencia `.env.example`
3. Iniciar el servidor
```bash
npm run dev
```

## Pruebas de endpoints (VS Code Rest Client)
- Archivo: `tests/test.endpoints.http`
- Generar token de prueba:
```bash
node generar-token.js
```
- Reemplazar `PRODUCTO_ID` con el `_id` devuelto por el POST
- Enviar solicitudes: POST, GET, GET/:id (sin auth), PUT/DELETE (con Bearer token)

## Notas
- Los archivos `.env*` no se suben al repositorio (por seguridad). Se provee `.env.example` para replicar el entorno.
- El endpoint `GET /api/v1/albums/csv` consume `jsonplaceholder`, genera CSV de 15 registros y lo guarda en `database/albums_15.csv`.
