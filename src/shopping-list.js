require('dotenv').config();
const knex = require('knex');
const ItemsService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});
// use all the ItemsService methods!!
ItemsService.getAllItems(knexInstance)
  .then(Items => console.log(Items))
  .then(() =>
    ItemsService.insertItem(knexInstance, {
      title: 'New title',
      content: 'New content',
      date_published: new Date(),
    })
  )
  .then(newItem => {
    console.log(newItem);
    return ItemsService.updateItem(
      knexInstance,
      newItem.id,
      { title: 'Updated title' }
    ).then(() => ItemsService.getById(knexInstance, newItem.id));
  })
  .then(Item => {
    console.log(Item);
    return ItemsService.deleteItem(knexInstance, Item.id);
  });
console.log(ItemsService.getAllItems());