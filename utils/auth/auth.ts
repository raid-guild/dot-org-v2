import { NextApiRequest } from 'next';
import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { SiweMessage } from 'siwe';

// camelized version of DB columns

export interface IUser {
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContract {
  name: string;
  address: string;
  chainId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContractCreate {
  address: string;
  chainId: number;
}

// AUTH

export type CreateTokenParams = {
  user?: User | unknown;
  token?: JWT;
  maxAge?: number;
  roles?: string[];
};

export type HasuraAuthToken = {
  sub?: string;
  user?: {
    id?: string;
  };
  address?: string;
  iat?: number;
  exp?: number;
  role?: string;
  roles?: string[];
  'https://hasura.io/jwt/claims'?: {
    'x-hasura-allowed-roles': string[];
    'x-hasura-default-role'?: string;
    'x-hasura-role'?: string;
    'x-hasura-user-id'?: string;
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
