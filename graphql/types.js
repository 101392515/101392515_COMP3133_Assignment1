const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(_id: ID!): Employee
    login(username: String!, password: String!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
    updateEmployee(_id: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee!
    deleteEmployee(_id: ID!): Employee!
  }
`;

module.exports = typeDefs;
