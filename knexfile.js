import { getConfig } from "./src/config.js";

const config = getConfig();

const knexConfig = {
	development: {
		client: "better-sqlite3",
		connection: {
				filename: config.DATABASE_URL,
		},
		useNullAsDefault: true,
	},
	production: {
		client: "pg",
		connection: config.DATABASE_URL,
	}
};

export function getKnexConfigForEnv(databaseEnvironment) {
	const configForEnv = knexConfig[databaseEnvironment];
	if (!configForEnv) {
		throw new Error(
			`No Knex database configuration found for environment '${databaseEnvironment}'`
		);
	}

	return configForEnv;
}

export default knexConfig;
