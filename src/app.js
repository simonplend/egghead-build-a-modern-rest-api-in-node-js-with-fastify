import Fastify from "fastify";
import sensiblePlugin from "@fastify/sensible";

import knexPlugin from "./plugins/knex.js";
import { getKnexConfigForEnv } from "../knexfile.js"

import recipesRoutes from "./routes/recipes.js";

export async function buildApp(config) {
	const app = Fastify({
		logger: {
			level: config.LOG_LEVEL,
			transport:
				config.LOG_PRETTY_PRINT
					? { target: "pino-pretty" }
					: null,
		},
	});

	await app.register(sensiblePlugin);

	const knexConfig = getKnexConfigForEnv(config.DATABASE_ENVIRONMENT);
	await app.register(knexPlugin, { knexConfig });

	await app.register(recipesRoutes, { prefix: "/recipes" });

	return app;
}
