import { buildApp } from "./app.js";

const app = await buildApp();

try {
	app.listen({ port: app.config.PORT, host: "0.0.0.0" });
} catch (error) {
	app.log.error(error);
	process.exit(1);
}
