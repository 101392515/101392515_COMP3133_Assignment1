const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
    const app = express();
  
    // Setting Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
  
    // Starting Apollo Server
    await server.start();
  
    // Applying middleware to Express app
    server.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 4000;
  
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  
    // Connecting to MongoDB
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.jqnxggv.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
    }
};

startServer();
