import _ from 'lodash';
import { User } from 'next-auth';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { SiweAuthorizeParams, SiweMessageAuthorizeParams, SiweCredentialParams } from '../../types';

const { NEXTAUTH_URL } = process.env;

const defaultCredential = { type: 'text', placeholder: '0x0' };

export const siweCredentials = {
  message: { label: 'Message', ...defaultCredential },
  signature: { label: 'Signature', ...defaultCredential },
};

const parseCredentials = ({ credentials, req }: SiweAuthorizeParams) => {
  const siwe = new SiweMessage(JSON.parse(_.get(credentials, 'message', '{}')));
  return Promise.resolve({ siwe, credentials, req });
};

const checkNonce = async ({ siwe, credentials, req }: SiweMessageAuthorizeParams) => {
  // ? leaving this because getCsrfToken is not doesn't appear to use
  // ? the entire IncomingMessage so this could be Partial<IncomingMessage>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore next-line
  return getCsrfToken({ req }).then((nonce) => {
    if (!_.eq(_.get(siwe, 'nonce'), nonce)) {
      return Promise.reject(Error('Invalid nonce'));
    }
    return Promise.resolve({ siwe, credentials, req });
  });
};

const checkDomain = ({ siwe, credentials }: SiweCredentialParams): Promise<SiweCredentialParams> => {
  if (!NEXTAUTH_URL) {
    return Promise.reject(Error('Invalid domain'));
  }
  if (!_.eq(_.get(siwe, 'domain'), new URL(NEXTAUTH_URL).host)) {
    return Promise.reject(Error('Invalid domain'));
  }
  return Promise.resolve({ siwe, credentials });
};

const checkSignature = ({ siwe, credentials }: SiweCredentialParams): Promise<SiweCredentialParams> =>
  siwe
    .validate(_.get(credentials, 'signature', ''))
    .then(() => Promise.resolve({ siwe, credentials }))
    .catch((error: Error) => {
      console.log(error);
      return Promise.reject(Error('Invalid signature'));
    });

export const authorizeSiweMessage = (data: SiweAuthorizeParams): Promise<User | null> =>
  parseCredentials(data)
    .then((d) => checkNonce(d))
    .then((d) => checkDomain(d))
    .then((d) => checkSignature(d))
    .then(({ siwe }) => {
      return { id: _.get(siwe, 'address'), address: _.get(siwe, 'address') }; // TODO _.toLower
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
