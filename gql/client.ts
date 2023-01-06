import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const HASURA_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

type ClientParams = {
  token?: string;
  userId?: string;
};

type Headers = {
  authorization?: string;
  'x-hasura-user-id'?: string;
  'x-hasura-admin-secret'?: string;
};

const client = ({ token, userId }: ClientParams) => {
  const headers: Headers = {};

  if (token) {
    headers.authorization = `Bearer ${token}`;

    // * Set matching session variables for Hasura where needed
    if (userId) {
      headers['x-hasura-user-id'] = userId;
    }
  }
  if (HASURA_ADMIN_SECRET) {
    headers['x-hasura-admin-secret'] = HASURA_ADMIN_SECRET;
  }

  return new GraphQLClient(API_URL, { headers });
};

export default client;
