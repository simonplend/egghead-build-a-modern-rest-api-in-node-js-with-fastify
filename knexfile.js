import { getConfig } from "./src/config.js";

const config = getConfig();

export default {
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
