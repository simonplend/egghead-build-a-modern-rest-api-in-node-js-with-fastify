import fastify from "fastify";
import { buildApp } from "./app.js";

const app = await buildApp();

try {
	app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exit(1);
}
