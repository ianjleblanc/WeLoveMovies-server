
exports.up = function(knex) {
    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary();
        table.string("name");
        table.string("address_line_1");
        table.string("address_line_2");
        table.city("city");
        table.string("image_url");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("theaters");
};
