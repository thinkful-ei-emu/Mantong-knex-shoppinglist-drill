require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});
console.log('connection successful');


const searchTerm = 'holo';
knexInstance
  .select('id', 'name', 'price', 'date_added','checked','category')
  .from('shopping_list')
  .where('name', 'ILIKE', `%${searchTerm}%`)
  .then(result => {
    console.log(result);
  });

function searchByProduceName(searchTerm) {
  knexInstance
    .select('id', 'name', 'price', 'date_added','checked','category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}
  
searchByProduceName('holo');