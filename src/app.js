import Fastify from "fastify";
import sensiblePlugin from "@fastify/sensible";

import { getConfig } from "./config.js";
import knexPlugin from "./plugins/knex.js";
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

	await fastify.register(sensiblePlugin);

	await fastify.register(knexPlugin);

	await fastify.register(recipesRoutes, { prefix: "/recipes" });

	return fastify;
}
