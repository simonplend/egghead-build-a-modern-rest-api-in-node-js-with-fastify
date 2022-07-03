import Fastify from "fastify";

export async function buildApp() {
	const fastify = Fastify({
		logger: true,
	});

	fastify.get("/", async function(request, reply) {
		return { data: true };
	});

	return fastify;
}
