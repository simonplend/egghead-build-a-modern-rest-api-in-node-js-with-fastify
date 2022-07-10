import fastifyPlugin from "fastify-plugin";
import Knex from "knex";
import knexConfig from "../../knexfile.mjs";

async function knexPlugin(app) {
	const knex = Knex(knexConfig.development);

	app.decorate("knex", knex);
}

export default fastifyPlugin(knexPlugin);
