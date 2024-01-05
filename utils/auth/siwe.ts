import _ from 'lodash';
import { User } from 'next-auth';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { SiweAuthorizeParams, SiweCredentialParams, SiweMessageAuthorizeParams } from '../../types';

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
  const nonce = await getCsrfToken({ req: { headers: req?.headers } });
  if (!_.eq(_.get(siwe, 'nonce'), nonce)) {
    throw new Error('Invalid nonce');
  }
  return { siwe, credentials, req };
};

const checkDomain = ({ siwe, credentials }: SiweCredentialParams): Promise<SiweCredentialParams> => {
  if (!NEXTAUTH_URL) {
    throw new Error('Invalid set domain');
  }
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({ siwe, credentials });
  }
  if (!_.eq(_.get(siwe, 'domain'), new URL(NEXTAUTH_URL).host)) {
    throw new Error('Invalid domain');
  }
  return Promise.resolve({ siwe, credentials });
};

const checkSignature = async ({ siwe, credentials }: SiweCredentialParams) => {
  await siwe.verify({ signature: _.get(credentials, 'signature', '') });
  return { siwe, credentials };
};

export const authorizeSiweMessage = async (data: SiweAuthorizeParams): Promise<User | null> => {
  try {
    const parsedData = await parseCredentials(data);
    const nonceChecked = await checkNonce(parsedData);
    const domainChecked = await checkDomain(nonceChecked);
    const signatureChecked = await checkSignature(domainChecked);
    return { id: _.toLower(_.get(signatureChecked.siwe, 'address')), address: _.get(signatureChecked.siwe, 'address') };
  } catch (error) {
    console.error(error);
    return null;
  }
};
