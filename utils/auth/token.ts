import _ from 'lodash';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT, JWTDecodeParams } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { CreateTokenParams } from '../../types';
import { getOrCreateUser } from './queryHelpers';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || '';

export const CONFIG: { encodingAlgorithm: 'HS256'; defaultRoles: string[]; defaultMaxAge: number } = {
  encodingAlgorithm: 'HS256',
  defaultRoles: ['member'], // match HASURA_GRAPHQL_UNAUTHORIZED_ROLE
  defaultMaxAge: 30 * 60, // 30 minutes
};

// Could be swapped for different API models
export const createToken = ({ user, token, maxAge, roles }: CreateTokenParams): JWT => ({
  ...token,
  address: _.get(token, 'sub'),
  user: {
    id: _.get(user, 'id', ''),
  },
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (maxAge ?? CONFIG.defaultMaxAge),
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': roles ?? CONFIG.defaultRoles,
    'x-hasura-default-role': _.first(roles ?? CONFIG.defaultRoles),
    'x-hasura-role': _.first(roles ?? CONFIG.defaultRoles),
    'x-hasura-user-id': _.get(user, 'id', ''),
  },
});

export const encodeToken = (token: JWT) => jwt.sign(token, NEXTAUTH_SECRET, { algorithm: CONFIG.encodingAlgorithm });

export const encodeAuth = async ({ token, maxAge }: { token?: JWT; maxAge?: number }) => {
  if (!token) return '';
  if (_.get(token, 'exp')) return encodeToken(token);

  const address = _.get(token, 'sub');
  if (!address) return '';

  const user = await getOrCreateUser(address);

  return encodeToken(createToken({ user, token, maxAge }));
};

export const decodeToken = (token: string): JWT =>
  jwt.verify(token, NEXTAUTH_SECRET, {
    algorithms: [CONFIG.encodingAlgorithm],
  }) as JwtPayload & JWT;

export const decodeAuth = async ({ token }: JWTDecodeParams) => (token ? decodeToken(token) : null);

export const extendSessionWithUserAndToken = ({
  user,
  session,
  token,
}: {
  user: User;
  session: Session;
  token: JWT;
}): Session => ({
  ...session,
  user: {
    address: _.get(token, 'sub', ''),
    id: _.get(user, 'id', ''),
  },
  token: encodeToken(token),
});
