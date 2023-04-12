const { GraphQLScalarType } = require("graphql");

const userResolvers = {
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id),
  },

  Mutation: {
    addUser: async (root, { user }, { dataSources }) =>
      dataSources.usersAPI.addUser(user),
    editUser: async (root, novosDados, { dataSources }) =>
      dataSources.usersAPI.editUser(novosDados),
    deleteUser: async (root, { id }, { dataSources }) =>
      dataSources.usersAPI.deleteUser(id),
  },
};

module.exports = userResolvers;
