module.exports = {
    transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest'],
      '\\.(gql|graphql)$': '@jagi/jest-transform-graphql',
    },
  }