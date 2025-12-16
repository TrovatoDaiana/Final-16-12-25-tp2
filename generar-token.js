import jwt from "jsonwebtoken";

// Genera un token JWT válido para pruebas
const token = jwt.sign(
	{
		sub: "user-123",
		role: "admin",
	},
	"dev-jwt-secret", // Debe coincidir con JWT_SECRET en .env.dev
	{ expiresIn: "1h" },
);

console.log("\n=== TOKEN JWT GENERADO ===");
console.log(token);
console.log(
	"\nCopia este token y pegalo en la variable @token del archivo test.endpoints.http",
);
console.log("\n");
