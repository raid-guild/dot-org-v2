import { verify } from 'jsonwebtoken';
import { utils } from 'ethers';

import { message_to_sign_join } from '../utils/constants';

export const withToken = (handler) => {
  return async (req, res) => {
    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(' ')[1];

    if (token == null) return res.status(401).json('Not Authenticated.');

    verify(token, process.env.JWT_SECRET, (err, signature) => {
      if (err) return res.status(401).json('Invalid Token.');
      const msgHash = utils.hashMessage(message_to_sign_join);
      const msgHashBytes = utils.arrayify(msgHash);
      const account = utils.recoverAddress(msgHashBytes, signature);

      if (
        account !== req.body['ETH Address'] &&
        account !== req.body['eth_address']
      )
        return res.status(401).json('Invalid Signature.');

      return handler(req, res);
    });
  };
};
