/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { NextRouter } from 'next/router';

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
