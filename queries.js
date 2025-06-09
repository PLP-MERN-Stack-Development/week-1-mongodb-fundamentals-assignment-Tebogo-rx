// TASK 2 

// Find all books in a specific genre
db.books.find({genre: "Fantasy"})
// Find books published after a certain year
db.books.find({published_year: {$gt: 1950}})
// Find books by a specific author
db.books.find({author: "J.R.R. Tolkien"})
// Update the price of a specific book
db.books.updateOne({title: 'The Catcher in the Rye'}, {$set: {price: 11.99}})
// Delete a book by its title
db.books.deleteOne({title: '1984'})

// TASK 3
//find books that are both in stock and published after 2010
db.books.find({$and: [{in_stock: true}, {published_year: { $gt : 2010 }}]})
//Use projection to return only the title, author, and price fields in your queries
db.books.find({}, {_id: 0, title: 1, author: 1, price: 1})
//Sorting to display books by price (both ascending and descending)
//Ascending order
db.books.find().sort({price: 1 })
//Descendin order
db.books.find().sort({price: -1 })
//Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find({}).skip(0).limit(5)
db.books.find({}).skip(5).limit(5)

// TASK 4
//Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([{ $group:{ _id: "$genre", avgPrice:{ $avg: "$price"}}}])
//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([{ $group: { _id: "$author", totalNumBooks: { $sum: 1}}}, {$sort: { totalNumBooks: -1}}, {$limit: 1}]);
//Implement a pipeline that groups books by publication decade and counts them
 db.books.aggregate([{ $addFields: { decade: {$concat: [{ $toString: {$multiply: [{ $floor: { $divide: ["$published_year", 10]}}, 10]}}, "s"]}}}, { $group: { _id: "$decade", count: { $sum: 1 }}}, { $sort: { _id: 1}}]);

 // TASK 5
// Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });
// Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: 1 });
// Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ author: "Harper Lee", published_year: 1960 }).explain("executionStats");
