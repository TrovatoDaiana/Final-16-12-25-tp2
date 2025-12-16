import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

function unauthorized(res, message = "No autorizado") {
	return res.status(401).json({ statusCode: 401, error: message });
}

export default function authMiddleware(req, res, next) {
	const strategy = config.authStrategy;

	if (strategy === "none") {
		return next();
	}

	if (strategy === "api-key") {
		const headerKey = req.header("x-api-key");
		if (!headerKey || headerKey !== config.apiKey) {
			return unauthorized(res, "x-api-key inválida o ausente");
		}
		return next();
	}

	if (strategy === "jwt") {
		const auth = req.header("authorization") || "";
		const [scheme, token] = auth.split(" ");
		if (scheme !== "Bearer" || !token) {
			return unauthorized(res, "Token Bearer ausente");
		}
		try {
			const payload = jwt.verify(token, config.jwtSecret);
			req.user = payload;
			return next();
		} catch (err) {
			return unauthorized(res, "Token inválido o expirado");
		}
	}

	//cuando config.authStrategy no es jwt, api-key ni none,devuelve 401,para no permitir acceso si la configuración es invalida
	return unauthorized(res);
}
