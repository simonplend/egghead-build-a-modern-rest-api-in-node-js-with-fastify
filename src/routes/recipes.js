export default async function recipesRoutes(app) {
	app.get("/", async function (request, reply) {
		const filter = request.query.filter;

		request.log.info({ filter });

		reply.send([]);
	});

	app.get("/:id", async function (request, reply) {
		reply.send({ id: request.params.id });
	});

	app.post("/", async function (request, reply) {
		reply.status(201).send(request.body);
	});

	app.put("/:id", async function (request, reply) {
		reply.send({ id: request.params.id, ...request.body });
	});

	app.delete("/:id", async function (request, reply) {
		reply.status(204);
	});

	app.addHook("onSend", async function (request, reply) {
		reply.header("Cache-Control", "no-store");
		reply.header("Pragma", "no-cache");
	});
}
