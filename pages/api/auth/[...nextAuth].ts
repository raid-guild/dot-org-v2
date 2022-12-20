/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import {
  client,
  MEMBER_ADDRESS_LOOKUP_QUERY,
  // MEMBER_CREATE_MUTATION,
} from '../../../gql';
import { Toast } from '@raidguild/design-system';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(_.get(credentials, 'message', '{}'))
          );
          let tempURL = process.env.NEXTAUTH_URL || "";
          const nextAuthUrl = new URL(tempURL);
          const nextAuthHost = _.get(nextAuthUrl, 'host');
          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(_.get(credentials, 'signature', ''));
          return {
            id: siwe.address,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const authSecret = process.env.NEXTAUTH_SECRET || "";

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
      maxAge: 60 * 30, // 30 minute token expiration
    },
    jwt: {
      // A secret to use for key generation (you should set this explicitly)
      secret: authSecret,
      // Set to true to use encryption (default: false)
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      encode: async ({ secret, token, maxAge }: any) => {
        if (token.id) return jwt.sign(token, secret, { algorithm: 'HS256' });
        let userId: string | undefined = '';
        let username: string | undefined = '';
        let address = null;
        // let roles = [];
        // let isCommunity = false;

        // TODO handle these asyncs better
        try {
          address = token.sub; // _.toLower(token.sub);
          const result = await client().query({
            query: MEMBER_ADDRESS_LOOKUP_QUERY,
            variables: {
              address,
            },
          });

          if (!_.isEmpty(_.get(result, 'data.members'))) {
            userId = _.get(_.first(_.get(result, 'data.members')), 'id');
            username = _.get(
              _.first(_.get(result, 'data.members')),
              'username'
            );
            // TODO handle role based on member_type
            // roles = _.map(
            //   _.get(_.first(_.get(result, 'data.users')), 'user_roles'),
            //   'roleByRole.role'
            // );
          } else {
            throw ('User not found in hasura lookup');
            // ! Don't create new users yet, until we can get the cohort auth/action figured out
            // const createUserResult = await client().mutate({
            //   mutation: MEMBER_CREATE_MUTATION,
            //   variables: {
            //     address,
            //   },
            // });
            // userId = _.get(
            //   _.first(_.get(createUserResult, 'data.insert_members.returning')),
            //   'id'
            // );
          }

          // add default roles for logged in and anonymous
          // roles = [...roles, 'user', 'public'];
          // isCommunity = _.includes(roles, 'community');
        } catch (error) {
          console.log(error);
        }

        const jwtClaims = {
          sub: address,
          id: userId,
          name: username,
          address,
          // roles,

          iat: Date.now() / 1000,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['member'],
            'x-hasura-default-role': 'member',
            'x-hasura-role': 'member',
            'x-hasura-user-id': userId,
          },
        };
        const encodedToken = jwt.sign(jwtClaims, secret, {
          algorithm: 'HS256',
        });

        return encodedToken;
      },
      decode: async (params) => {
        const { secret, token }: any = params;
        const decodedToken: any = jwt.verify(token, secret, {
          algorithms: ['HS256'],
        });
        return decodedToken;
      },
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async session({ session, token }: { session: any; token: any }) {
        // create account

        session.user = {
          id: _.get(token, 'id'),
          name: _.get(token, 'name') || _.get(token, 'sub'),
          address: _.get(token, 'sub'),
          image: '',
        };

        session.roles = _.get(token, 'roles');
        // TODO this seems not great, but easier than SSR on those pages?
        session.token = jwt.sign(token, authSecret, { algorithm: 'HS256' });
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token;
      },
    },
  });
}