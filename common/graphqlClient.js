const { GraphQLClient } = require('graphql-request');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com/graphql';

const getGraphqlClient = () => {
  const headers = { Authorization: `bearer ${GITHUB_TOKEN}` };
  return new GraphQLClient(GITHUB_API_URL, { headers });
}

module.exports = {
  getGraphqlClient,
}