import envSchema from "env-schema";
import S from "fluent-json-schema";

const configSchema = S.object()
	.required(["PORT", "LOG_LEVEL", "LOG_PRETTY_PRINT", "DATABASE_ENVIRONMENT"])
	.prop("PORT", S.string().default(3000))
	.prop(
		"LOG_LEVEL",
		S.string().enum(["debug", "info", "error"]).default("info")
	)
	.prop(
		"LOG_PRETTY_PRINT",
		S.boolean().default(false)
	)
	.prop(
		"DATABASE_ENVIRONMENT",
		S.string()
			.enum(["development", "production"])
			.default("development")
	);

export function getConfig() {
	const envSchemaOptions = {
		schema: configSchema,
		dotenv: true,
	};

	return envSchema(envSchemaOptions);
}
