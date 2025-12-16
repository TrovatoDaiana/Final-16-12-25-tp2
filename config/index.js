import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({
	path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env",
});

export const config = {
	mongoUri: process.env.MONGO_URI,
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV,
	apiKey: process.env.API_KEY,
	jwtSecret: process.env.JWT_SECRET,
	authStrategy: (process.env.AUTH_STRATEGY || "jwt").toLowerCase(),
};
