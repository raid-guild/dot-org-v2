import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { CreateTokenParams, HasuraAuthToken } from './auth';
import { getOrCreateUser } from './queryHelpers';

const { NEXTAUTH_SECRET } = process.env;

export const CONFIG = {
  encodingAlgorithm: 'HS256',
  defaultRoles: ['user'], // match HASURA_GRAPHQL_UNAUTHORIZED_ROLE
  defaultMaxAge: 30 * 60, // 30 minutes
};

// Could be swapped for different API models
export const createToken = ({ user, token, maxAge, roles }: CreateTokenParams): HasuraAuthToken => ({
  ...token,
  address: _.get(token, 'sub'),
  user: {
    id: _.get(user, 'id'),
  },
  role: _.first(roles ?? CONFIG.defaultRoles),
  roles: roles ?? CONFIG.defaultRoles,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (maxAge ?? CONFIG.defaultMaxAge),
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': roles ?? CONFIG.defaultRoles,
    'x-hasura-default-role': _.first(roles ?? CONFIG.defaultRoles),
    'x-hasura-role': _.first(roles ?? CONFIG.defaultRoles),
    'x-hasura-user-id': _.get(user, 'id'),
  },
});

export const encodeToken = (token: HasuraAuthToken | undefined) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jwt.sign(token, NEXTAUTH_SECRET, { algorithm: CONFIG.encodingAlgorithm });

export const encodeAuth = async ({ token, maxAge }: { token?: HasuraAuthToken; maxAge?: number }) => {
  if (_.get(token, 'exp')) return encodeToken(token);
  return getOrCreateUser(_.get(token, 'sub') as string)
    .then((user) => {
      if (user === 'AUTHED_USER') {
        return encodeToken(
          createToken({
            user: { id: _.get(token, 'sub') },
            token,
            maxAge,
            roles: ['user'],
          }),
        );
      }

      return encodeToken(createToken({ user, token, maxAge, roles: ['member'] }));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return ''; // better fallback?
    });
};

export const decodeToken = (token: string) =>
  jwt.verify(token as string, NEXTAUTH_SECRET as string, {
    algorithms: [CONFIG.encodingAlgorithm as any],
  });

export const decodeAuth = async ({ token }: { token: string }) => decodeToken(token);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore next-line
    address: _.get(token, 'sub'),
    id: _.get(token, 'user.id') as string,
    role: _.get(token, 'role') as string,
    roles: _.get(token, 'roles') as string[],
  },
  token: encodeToken(token),
});
