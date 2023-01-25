import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { CreateTokenParams, HasuraAuthToken, HasuraClaimsToken } from '../../types';
import { getOrCreateUser } from './queryHelpers';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || '';

export const CONFIG: { encodingAlgorithm: 'HS256'; defaultRoles: string[]; defaultMaxAge: number } = {
  encodingAlgorithm: 'HS256',
  defaultRoles: ['member'], // match HASURA_GRAPHQL_UNAUTHORIZED_ROLE
  defaultMaxAge: 30 * 60, // 30 minutes
};

// Could be swapped for different API models
export const createToken = ({ user, token, maxAge, roles }: CreateTokenParams): HasuraAuthToken => {
  let hasuraClaims: HasuraClaimsToken = {
    'x-hasura-allowed-roles': roles ?? CONFIG.defaultRoles,
    'x-hasura-default-role': _.first(roles ?? CONFIG.defaultRoles),
    'x-hasura-role': _.first(roles ?? CONFIG.defaultRoles),
  };

  if (_.get(user, 'id')) {
    hasuraClaims = {
      ...hasuraClaims,
      'x-hasura-user-id': _.get(user, 'id'),
    };
  }

  return {
    ...token,
    address: _.get(token, 'sub'),
    user: {
      id: _.get(user, 'id', ''),
      roles: roles ?? CONFIG.defaultRoles,
    },
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (maxAge ?? CONFIG.defaultMaxAge),
    'https://hasura.io/jwt/claims': hasuraClaims,
  };
};

export const encodeToken = (token: object) => jwt.sign(token, NEXTAUTH_SECRET, { algorithm: CONFIG.encodingAlgorithm });

export const encodeAuth = async ({ token, maxAge }: JWTEncodeParams): Promise<string> => {
  if (token && _.get(token, 'exp')) return encodeToken(token);

  const address = _.get(token, 'sub');
  if (!address) return '';

  const user = await getOrCreateUser(address);

  if (user === 'AUTHED_USER') {
    return encodeToken(createToken({ user: { id: _.get(token, 'sub') }, token, maxAge, roles: ['user'] }));
  }

  let roles = ['cohort'];
  if (_.get(user, 'memberType.memberType') === 'MEMBER') {
    roles = ['member', ...roles];
  }

  return encodeToken(createToken({ user, token, maxAge, roles }));
};

export const decodeToken = (token: string) =>
  jwt.verify(token, NEXTAUTH_SECRET, {
    algorithms: [CONFIG.encodingAlgorithm],
  }) as JWT;

export const decodeAuth = async ({ token }: JWTDecodeParams): Promise<JWT | null> =>
  token ? decodeToken(token) : null;

export const extendSessionWithUserAndToken = ({
  user,
  session,
  token,
}: {
  user: User;
  session: Session;
  token: JWT | HasuraAuthToken;
}): Session => ({
  ...session,
  user: {
    address: _.get(token, 'sub', ''),
    id: _.get(user, 'id', ''),
    roles: _.get(token, 'user.roles', []),
  },
  token: encodeToken(token),
});
