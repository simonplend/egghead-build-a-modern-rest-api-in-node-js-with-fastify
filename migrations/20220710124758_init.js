export const up = async (knex) => {
	return knex.schema.createTable("recipes", function (table) {
		table.uuid('id').primary().notNullable();
		table.text("name");
		table.text("ingredients");
		table.integer("time");
		table.text("steps");
	});
};

export const down = async (knex) => {
	return knex.schema.dropTable("recipes");
};
