import _ from 'lodash';
import { isAddress } from '@ethersproject/address';
import {
  client,
  // USER_CREATE_MUTATION,
  MEMBER_ADDRESS_LOOKUP_QUERY,
} from '../../gql';
import { IUser } from '../../types';

const fetchExistingUser = async (address: string): Promise<IUser | null> =>
  client({})
    .request(MEMBER_ADDRESS_LOOKUP_QUERY, { address }) // { address: _.toLower(address) })
    .then((res) => {
      if (!_.isEmpty(_.get(res, 'members'))) {
        return Promise.resolve(_.first(_.get(res, 'members')));
      }
      return Promise.resolve(null);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });

// const createNewUser = async (address: string): Promise<IUser | null> =>
//   client({})
//     .request(USER_CREATE_MUTATION, { address: _.toLower(address) })
//     .then((res) => {
//       if (_.get(res, 'insert_users.returning')) {
//         return Promise.resolve(_.get(res, 'insert_users.returning'));
//       }
//       return Promise.resolve(null);
//     })
//     .catch((error) => {
//       console.log(error);
//       return Promise.reject(error);
//     });

export const getOrCreateUser = async (address: string): Promise<IUser> => {
  if (!address || !isAddress(address)) {
    throw new Error('No address provided');
  }
  return fetchExistingUser(address).then((existingUser: IUser) => {
    if (existingUser) {
      return Promise.resolve(existingUser);
    }
    // return createNewUser(address).then((newUser: IUser) => {
    //   if (newUser) {
    //     return Promise.resolve(newUser);
    //   }
    //   return Promise.reject('Could not create user');
    // });
    return Promise.reject('Could not find user');
  });
};
