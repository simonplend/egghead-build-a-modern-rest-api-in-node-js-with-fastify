import S from "fluent-json-schema";

const paramsSchema = S.object().prop("id", S.number().required());

const filterSchema = S.object().prop(
	"filter",
	S.string().minLength(1).maxLength(100)
);

const recipeSchema = S.object()
	.required(["name", "ingredients", "time", "steps"])
	.prop("name", S.string().minLength(3).maxLength(100))
	.prop(
		"ingredients",
		S.array().minItems(1).items(S.string().minLength(3).maxLength(100))
	)
	.prop("time", S.number().minimum(1).maximum(1000))
	.prop("steps", S.string().minLength(10).maxLength(10000));

export default async function recipesRoutes(app) {
	app.get(
		"/",
		{ schema: { query: filterSchema } },
		async function (request, reply) {
			const filter = request.query.filter;

			request.log.info({ filter });

			reply.send([]);
		}
	);

	app.get(
		"/:id",
		{ schema: { params: paramsSchema } },
		async function (request, reply) {
			reply.send({ id: request.params.id });
		}
	);

	app.post(
		"/",
		{ schema: { body: recipeSchema } },
		async function (request, reply) {
			reply.status(201).send(request.body);
		}
	);

	app.put(
		"/:id",
		{ schema: { params: paramsSchema, body: recipeSchema } },
		async function (request, reply) {
			reply.send({ id: request.params.id, ...request.body });
		}
	);

	app.delete(
		"/:id",
		{ schema: { params: paramsSchema } },
		async function (request, reply) {
			reply.status(204);
		}
	);

	app.addHook("onSend", async function (request, reply) {
		reply.header("Cache-Control", "no-store");
		reply.header("Pragma", "no-cache");
	});
}
