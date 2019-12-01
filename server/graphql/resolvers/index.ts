import { IResolvers } from 'apollo-server-micro';
import Query from './query';
import Period from './period';
import { IGQLContext } from './../interface';

export default {
  Query,
  Period,
} as IResolvers<any, IGQLContext>;
