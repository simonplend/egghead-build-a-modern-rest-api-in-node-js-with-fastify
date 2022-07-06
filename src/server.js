import { buildApp } from "./app.js";

const app = await buildApp();

try {
	app.listen({ port: app.config.PORT });
} catch (error) {
	app.log.error(error);
	process.exit(1);
}
