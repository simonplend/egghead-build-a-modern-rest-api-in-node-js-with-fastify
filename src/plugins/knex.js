import fastifyPlugin from "fastify-plugin";
import Knex from "knex";

async function knexPlugin(app, options) {
	const knex = Knex(options.knexConfig);

	app.decorate("knex", knex);
}

export default fastifyPlugin(knexPlugin);
