import { randomUUID } from "node:crypto";
import S from "fluent-json-schema";

const paramsSchema = S.object().prop(
	"id",
	S.string().format("uuid").required()
);

const filterSchema = S.object().prop(
	"filter",
	S.string().minLength(1).maxLength(100)
);

const recipeSchema = S.object()
	.prop("name", S.string().minLength(3).maxLength(100))
	.prop(
		"ingredients",
		S.string().minLength(3).maxLength(1000)
	)
	.prop("time", S.number().minimum(1).maximum(1000))
	.prop("steps", S.string().minLength(10).maxLength(10000))
	.required(["name", "ingredients", "time", "steps"]);

export default async function recipesRoutes(app) {
	app.get(
		"/",
		{ schema: { query: filterSchema } },
		async function (request, reply) {
			const filter = request.query.filter;

			let recipesQuery = app.knex("recipes").select();

			if (filter) {
				recipesQuery = recipesQuery.where("name", "like", `%${filter}%`);
			}

			try {
				const recipes = await recipesQuery;
				reply.send(recipes);
			} catch (error) {
				request.log.error(error);
				reply.internalServerError("Error retrieving recipes");
			}
		}
	);

	app.get(
		"/:id",
		{ schema: { params: paramsSchema } },
		async function (request, reply) {
			try {
				const recipe = await app
					.knex("recipes")
					.first()
					.where("id", request.params.id);

				if (!recipe) {
					return reply.notFound("Recipe not found");
				}

				reply.send(recipe);
			} catch (error) {
				request.log.error(error);
				reply.internalServerError("Error retrieving recipe");
			}
		}
	);

	app.post(
		"/",
		{ schema: { body: recipeSchema } },
		async function (request, reply) {
			try {
				const recipe = {
					id: randomUUID(),
					...request.body,
				};

				const recipes = await app
					.knex("recipes")
					.insert(recipe, ["id", "name", "ingredients", "time", "steps"]);

				reply.status(201).send(recipes[0]);
			} catch (error) {
				request.log.error(error);
				reply.internalServerError("Error adding recipe");
			}
		}
	);

	app.put(
		"/:id",
		{ schema: { params: paramsSchema, body: recipeSchema } },
		async function (request, reply) {
			try {
				const updatedRecipes = await app
					.knex("recipes")
					.where("id", request.params.id)
					.update(request.body, ["id", "name", "ingredients", "time", "steps"]);

				if (updatedRecipes.length === 0) {
					return reply.notFound("Recipe not found");
				}

				reply.send(updatedRecipes[0]);
			} catch (error) {
				request.log.error(error);
				reply.internalServerError("Error updating recipe");
			}
		}
	);

	app.delete(
		"/:id",
		{ schema: { params: paramsSchema } },
		async function (request, reply) {
			try {
				const deletedRecipes = await app
					.knex("recipes")
					.where("id", request.params.id)
					.del();

				if (deletedRecipes === 0) {
					return reply.notFound("Recipe not found");
				}

				reply.status(204);
			} catch (error) {
				request.log.error(error);
				reply.internalServerError("Error deleting recipe");
			}
		}
	);

	app.addHook("onSend", async function (request, reply) {
		reply.header("Cache-Control", "no-store");
		reply.header("Pragma", "no-cache");
	});
}
