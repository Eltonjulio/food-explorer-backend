exports.up = knex => knex.schema.createTable("favorite", table=> {
  table.increments("id");
  table.string("user_id");
  table.string("dishes_id");
  table.foreign("dishes_id").references("dishes.id");
  table.foreign("user_id").references("users.id");
  
});


exports.down = knex => knex.schema.dropTable("favorite");