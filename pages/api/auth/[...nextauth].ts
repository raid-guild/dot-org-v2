import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  authorizeSiweMessage,
  CONFIG,
  decodeAuth,
  encodeAuth,
  extendSessionWithUserAndToken,
  siweCredentials,
} from '../../../utils/auth';

const { NEXTAUTH_SECRET } = process.env;

const siweProvider = CredentialsProvider({
  name: 'Ethereum',
  credentials: siweCredentials,
  authorize: (credentials, req) => authorizeSiweMessage({ credentials, req }),
});

type NextAuthOptions = Parameters<typeof NextAuth>[2];

export const authOptions: NextAuthOptions = {
  providers: [siweProvider],
  session: { strategy: 'jwt', maxAge: CONFIG.defaultMaxAge },
  jwt: {
    secret: NEXTAUTH_SECRET,
    encode: encodeAuth,
    // used any because not sure how to type this
    decode: decodeAuth as any,
  },
  callbacks: { session: extendSessionWithUserAndToken },
};

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const options: NextAuthOptions = authOptions;

  return NextAuth(req, res, options);
};

export default Auth;
