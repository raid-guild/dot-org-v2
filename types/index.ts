import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';
import { NextApiRequest } from 'next';
import { SiweMessage } from 'siwe';

// camelized version of DB columns

// AUTH

export type CreateTokenParams = {
  user: User;
  token: JWT;
  maxAge?: number;
  roles?: string[];
};

export type HasuraAuthToken = {
  sub?: string;
  address?: string;
  user: {
    id?: string;
  };
  iat?: number;
  exp?: number;
  'https://hasura.io/jwt/claims'?: {
    'x-hasura-allowed-roles': string[];
    'x-hasura-default-role'?: string;
    'x-hasura-role'?: string;
    'x-hasura-user-id': string;
  };
};

// SIWE verifications

export type SiweAuthorizeParams = {
  credentials: Record<'message' | 'signature', string>;
  req: NextApiRequest;
};

export type SiweMessageAuthorizeParams = {
  siwe: SiweMessage;
} & SiweAuthorizeParams;

export type SiweCredentialParams = {
  siwe: SiweMessage;
  credentials: Record<'message' | 'signature', string>;
};
