export default {
	development: {
		client: "better-sqlite3",
		connection: {
				filename: "./recipes.db",
		},
		migrations: {
			directory: './migrations',
			loadExtensions: ['.mjs']
		},
		useNullAsDefault: true,
	}
};
