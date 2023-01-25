import _ from 'lodash';
import client from '../client';
import { BLOG_LIST_QUERY, BLOG_DETAIL_QUERY } from '../queries';
import { camelize } from '../../utils';

export const getBlogsList = async (token?: string) => {
  const result = await client({ token }).request(BLOG_LIST_QUERY);

  return camelize(_.get(result, 'bids'));
};

export const getBlogDetail = async (slug: string, token?: string) => {
  const result = await client({ token }).request(BLOG_DETAIL_QUERY, {
    slug,
  });

  return camelize(_.get(result, 'bids'));
};
