const { ApolloServer, gql } = require("apollo-server");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const courses = [
  { name: "GraphQl", price: 9.99 },
  { name: "Apollo", price: 4.99 }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
    listing: Listing
  }

  type Listing {
    fulltitle: String
  }

  type Course {
    name: String
    price: Float
  }

  type Message {
    message: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    courses: [Course]
    hello(name: String): Message
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    courses: () => courses,
    hello: (root, args, context) => {
        console.log("context ", context);
        console.log("args ", args);
        console.log("root ", root);
      return { message: `hello ${args.name}` };
    }
  },
  Listing: {
    fulltitle: (root, args, context) => {
      console.log("root ", root);
      console.log("args ", args);
      console.log("context ", context);
      return `${root.name} by ${root.author}`;
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
