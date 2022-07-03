import envSchema from "env-schema";
import S from "fluent-json-schema";

const configSchema = S.object()
	.required(["NODE_ENV", "PORT", "LOG_LEVEL"])
	.prop(
		"NODE_ENV",
		S.string()
			.enum(["development", "test", "production"])
			.default("development")
	)
	.prop("PORT", S.string().default(3000))
	.prop(
		"LOG_LEVEL",
		S.string().enum(["debug", "info", "error"]).default("info")
	);

export function getConfig() {
	const envSchemaOptions = {
		schema: configSchema,
		dotenv: true,
	};

	return envSchema(envSchemaOptions);
}
