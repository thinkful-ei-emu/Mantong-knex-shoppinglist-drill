require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});
console.log('connection successful');

//Get all items that contain text
 
function searchByItemName(searchTerm) {
  knexInstance
    .select('id', 'name', 'price', 'date_added','checked','category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}
    
searchByItemName('sugar');

//Get all items paginated
function paginateItems(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance
    .select('id', 'name', 'price', 'date_added','checked','category')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}
  
paginateItems(2);

// Get all items added after date

function afterDate(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'date_added','checked','category')
    .count('date_viewed AS views')
    .where(
      'date_added',
      '>',
      knexInstance.raw('now() - \'?? days\'::INTERVAL', daysAgo)
    )
    .from('shopping_list')
    .then(result => {
      console.log(result);
    });
}

afterDate(5);

//Get the total cost for each category

function totalCostForEachCategory() {
  knexInstance
    .select('id', 'name', 'price', 'date_added','checked','category')
    .sum('totalCost')
    .from('shopping_list')
    .groupBy('category')
    .orderBy([
      { column: 'category', order: 'ASC' },
    ])
    .then(result => {
      console.log(result);
    });
}
  
totalCostForEachCategory();