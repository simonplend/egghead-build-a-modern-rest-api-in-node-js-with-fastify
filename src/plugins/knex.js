import fastifyPlugin from "fastify-plugin";
import Knex from "knex";
import knexConfig from "../../knexfile.js";

async function knexPlugin(app) {
	const config = knexConfig[app.config.DATABASE_ENVIRONMENT];
	if (!config) {
		throw new Error(
			`No Knex database configuration found for environment '${app.config.DATABASE_ENVIRONMENT}'`
		);
	}

	const knex = Knex(config);

	app.decorate("knex", knex);
}

export default fastifyPlugin(knexPlugin);
