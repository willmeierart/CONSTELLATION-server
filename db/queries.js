
const knex = require('./knex');


module.exports = {
  getAll(){
    return knex('pictures')
  },
  create(picture){
  const pictureNew = JSON.stringify(picture)
  return knex('pictures').insert(pictureNew, '*');
},
}
