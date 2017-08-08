// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'https://localhost/constellationpics'
  },

  production: {
  client: 'pg',
  connection: process.env.DATABASE_URL
  }
};
