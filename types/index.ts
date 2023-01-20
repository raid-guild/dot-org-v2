import { JWT } from 'next-auth/jwt';
import { User, RequestInternal } from 'next-auth';
// import { NextApiRequest } from 'next';
import { SiweMessage } from 'siwe';
// import { IncomingMessage } from 'http';

// camelized version of DB columns
export type IUser = {
  id: string;
  address: string;
  name: string;
  [x: string]: any;
};

// AUTH

export type CreateTokenParams = {
  user?: User | unknown;
  token?: JWT;
  maxAge?: number;
  roles?: string[];
};

export type HasuraClaimsToken = {
  'x-hasura-allowed-roles': string[];
  'x-hasura-default-role'?: string;
  'x-hasura-role'?: string;
  'x-hasura-user-id'?: string;
};

export type HasuraAuthToken = {
  sub?: string;
  address?: string;
  user: {
    id?: string;
    roles?: string[];
  };
  iat?: number;
  exp?: number;
  'https://hasura.io/jwt/claims'?: HasuraClaimsToken;
};

// SIWE verifications

export type AuthRequest = Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>;

export type SiweAuthorizeParams = {
  credentials?: Record<'message' | 'signature', string>;
  req?: AuthRequest;
};

export type SiweMessageAuthorizeParams = {
  siwe: SiweMessage;
} & SiweAuthorizeParams;

export type SiweCredentialParams = {
  siwe: SiweMessage;
  credentials?: Record<'message' | 'signature', string>;
};
