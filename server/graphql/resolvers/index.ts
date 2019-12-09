import { IResolvers } from 'apollo-server-micro';
import Query from './query';
import Period from './period';
import Day from './day';
import { IGQLContext } from './../interface';

export default {
  Query,
  Period,
  Day,
} as IResolvers<any, IGQLContext>;
