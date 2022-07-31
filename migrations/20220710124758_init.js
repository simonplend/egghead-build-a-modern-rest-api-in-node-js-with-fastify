export const up = async (knex) => {
  return knex.schema.createTable("recipes", function (table) {
		table.increments("id").primary();
		table.text("name");
		table.text("ingredients");
		table.integer("time");
		table.text("steps");
	});
};

export const down = async (knex) => {
	return knex.schema.dropTable("recipes");
};
