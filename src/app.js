import Fastify from "fastify";

import { getConfig } from "./config.js";
import recipesRoutes from "./routes/recipes.js";

export async function buildApp() {
	const config = getConfig();

	const fastify = Fastify({
		logger: {
			level: config.LOG_LEVEL,
			transport:
				config.NODE_ENV === "development"
					? { target: "pino-pretty" }
					: undefined,
		},
	});

	fastify.decorate("config", config);

	await fastify.register(recipesRoutes, { prefix: "/recipes" });

	return fastify;
}
