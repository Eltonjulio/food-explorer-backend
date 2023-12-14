exports.up = knex => knex.schema.createTable("Ingredients", table => {
  table.increments("id");
  table.text("name").notNullable();

  table.integer("dishes_id").references("id").inTable("dishes").onDelete("CASCADE");

}) 

exports.down = knex => knex.schema.dropTable("Ingredients");