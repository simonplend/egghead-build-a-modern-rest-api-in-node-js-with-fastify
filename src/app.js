import Fastify from "fastify";
import sensiblePlugin from "@fastify/sensible";

import { getConfig } from "./config.js";
import knexPlugin from "./plugins/knex.js";
import recipesRoutes from "./routes/recipes.js";

export async function buildApp() {
	const config = getConfig();

	const app = Fastify({
		logger: {
			level: config.LOG_LEVEL,
			transport:
				config.LOG_PRETTY_PRINT
					? { target: "pino-pretty" }
					: undefined,
		},
	});

	app.decorate("config", config);

	await app.register(sensiblePlugin);

	await app.register(knexPlugin);

	await app.register(recipesRoutes, { prefix: "/recipes" });

	return app;
}
