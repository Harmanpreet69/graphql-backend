import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import BookModel from "./models/book";

const Book = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    stock: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(Book),
      resolve() {
        try {
          return BookModel.find();
        } catch (error) {
          throw new Error("Error fetching books");
        }
      },
    },
    book: {
      type: Book,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        try {
          return BookModel.findById(args.id);
        } catch (error) {
          throw new Error("Error fetching book");
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: Book,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        stock: { type: GraphQLInt },
      },
      resolve(_, args) {
        try {
          return BookModel.create(args);
        } catch (error) {
          throw new Error("Error adding book");
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
