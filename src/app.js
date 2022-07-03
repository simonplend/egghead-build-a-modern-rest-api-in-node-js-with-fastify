import Fastify from "fastify";

import { getConfig } from "./config.js";

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

	fastify.get("/", async function (request, reply) {
		return { data: true };
	});

	return fastify;
}
