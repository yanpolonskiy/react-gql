const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const db = require('../models');

const books = [
  { name: 'Hello1', genre: 'Sci-Fi', id: '1', authorId: '1' },
  { name: 'World', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'There', genre: 'Life', id: '3', authorId: '3' },
  { name: 'Hello2', genre: 'Sci-Fi', id: '1', authorId: '1' },
  { name: 'World', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'There', genre: 'Life', id: '3', authorId: '3' },
  { name: 'Hello3', genre: 'Sci-Fi', id: '1', authorId: '1' },
  { name: 'World', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'There', genre: 'Life', id: '3', authorId: '3' },
];
const authors = [
  { name: 'Alex', age: 33, id: '1' },
  { name: 'Anna', age: 55, id: '2' },
  { name: 'John', age: 22, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return authors.find(author => author.id === parent.id);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books.filter(book => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return books.find(book => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return authors.find(author => author.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Promise.resolve(db.Book.findAll());
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Promise.resolve(db.Author.findAll());
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const author = db.Author.create({
          name: args.name,
          age: args.age,
        });
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const book = db.Book.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
