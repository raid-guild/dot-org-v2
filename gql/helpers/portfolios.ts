import _ from 'lodash';
import client from '../client';
import { PORTFOLIO_LIST_QUERY, PORTFOLIO_DETAIL_QUERY } from '../queries';
import { camelize } from '../../utils';

export const getPortfolioList = async (token?: string) => {
  const result = await client({ token }).request(PORTFOLIO_LIST_QUERY);

  return camelize(_.get(result, 'portfolios'));
};

export const getPortfolioDetail = async (slug: string, token?: string) => {
  const result = await client({ token }).request(PORTFOLIO_DETAIL_QUERY, {
    slug,
  });

  return camelize(_.first(_.get(result, 'portfolios')));
};
