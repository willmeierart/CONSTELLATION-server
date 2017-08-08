
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE pictures RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('pictures').insert([
        {
          data: JSON.stringify([{"backgroundColor":"rgb(0,0,0)"},{"backgroundColor":"rgb(121,210,210)"}])
        },
      ]);
    });
};
