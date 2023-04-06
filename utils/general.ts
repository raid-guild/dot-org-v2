/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { NextRouter } from 'next/router';

export const truncateAddress = (addr: string | undefined): string =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

export const slugFromRouterQuery = (router: NextRouter, param = 'project'): string => {
  const localSlug = _.get(router, `query.${param}`);
  if (!localSlug) return '';
  if (_.isArray(localSlug)) return _.first(localSlug) || '';
  return localSlug || '';
};

export const camelize = (obj: any) =>
  _.transform(obj, (acc: any, value: any, key: any, target: any) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);

    acc[camelKey] = _.isObject(value) ? camelize(value) : value;
  });

export const nameToSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

export const getMonthString = (date: Date) => {
  const publishMonth = date.getMonth();
  let publishMonthString;
  switch (publishMonth) {
    case 0:
      publishMonthString = 'Jan';
      break;
    case 1:
      publishMonthString = 'Feb';
      break;
    case 2:
      publishMonthString = 'Mar';
      break;
    case 3:
      publishMonthString = 'Apr';
      break;
    case 4:
      publishMonthString = 'May';
      break;
    case 5:
      publishMonthString = 'Jun';
      break;
    case 6:
      publishMonthString = 'Jul';
      break;
    case 7:
      publishMonthString = 'Aug';
      break;
    case 8:
      publishMonthString = 'Sep';
      break;
    case 9:
      publishMonthString = 'Oct';
      break;
    case 10:
      publishMonthString = 'Nov';
      break;
    case 11:
      publishMonthString = 'Dec';
      break;
    default:
      break;
  }
  return publishMonthString;
};

export const checkPermission = (session: any) => {
  if (!session) return '';
  const { user } = session;
  const toCheck = ['admin', 'cohort', 'member'];
  const canEdit = toCheck.some((role) => user.roles.includes(role));
  return canEdit;
};
