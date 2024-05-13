import { buildApp } from "./app.js";
import { getConfig } from "./config.js";

const config = getConfig();
const app = await buildApp(config);

try {
	app.listen({ port: config.PORT, host: "0.0.0.0" });
} catch (error) {
	app.log.error(error);
	process.exit(1);
}
