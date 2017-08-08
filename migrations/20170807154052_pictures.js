exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', (table) => {
    table.increments("id").primary();
    table.string("json");
  })
}

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('pictures')
};
