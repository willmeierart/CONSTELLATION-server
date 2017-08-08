
const knex = require('./knex');


module.exports = {
  getAll(){
    return knex('pictures')
  },
  create(picture){
  const pictureNew = JSON.stringify(picture)
  // console.log(pictureNew)
  return knex('pictures').insert({data:pictureNew}, '*');
},
}
